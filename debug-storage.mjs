import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  //process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  process.env.NEXT_SERVICE_ROLE_KEY
)

async function debugStorage() {
  console.log('🔍 Debugging Supabase Storage...\n')
  
  // Check if bucket exists and list root contents
  const { data: buckets, error: bucketError } = await supabase
    .storage
    .listBuckets()
  
  if (bucketError) {
    console.error('❌ Error listing buckets:', bucketError)
    return
  }
  
  console.log('📦 Available buckets:', buckets.map(b => b.name))
  console.log('')
  
  // Try to list root of 'items' bucket
  const { data: rootFiles, error: rootError } = await supabase
    .storage
    .from('items')
    .list('', { limit: 100 })
  
  if (rootError) {
    console.error('❌ Error listing root of items bucket:', rootError)
    return
  }
  
  console.log('📂 Root contents of "items" bucket:')
  if (rootFiles && rootFiles.length > 0) {
    rootFiles.forEach(file => {
      console.log(`   ${file.id ? '📁' : '📄'} ${file.name}`)
    })
  } else {
    console.log('   (empty)')
  }
  console.log('')
  
  // Try a specific folder that should have images
  console.log('🔍 Checking "beds" folder specifically...')
  const { data: bedsFiles, error: bedsError } = await supabase
    .storage
    .from('items')
    .list('beds', { limit: 100 })
  
  if (bedsError) {
    console.error('❌ Error:', bedsError)
  } else {
    console.log(`Found ${bedsFiles?.length || 0} items in beds folder:`)
    bedsFiles?.forEach(file => {
      console.log(`   ${file.name} (${file.metadata?.size || 0} bytes)`)
    })
  }
  
  console.log('')
  console.log('💡 Please check your Supabase dashboard:')
  console.log('   1. Go to Storage → items bucket')
  console.log('   2. Verify folder names match exactly (case-sensitive!)')
  console.log('   3. Check if bucket is set to "Public" or if RLS policies allow access')
}

// Add this to debug-storage.mjs after the root listing
console.log('\n🔍 Testing folder access...')
const testFolders = ['beds', 'chairs', 'storage-units']

for (const folder of testFolders) {
  const { data, error } = await supabase
    .storage
    .from('items')
    .list(folder)
  
  console.log(`\n${folder}:`)
  if (error) {
    console.log(`  ❌ Error: ${error.message}`)
  } else if (data && data.length > 0) {
    console.log(`  ✅ Found ${data.length} files`)
    data.slice(0, 3).forEach(f => console.log(`     - ${f.name}`))
  } else {
    console.log(`  ⚠️ Empty or not a folder`)
  }
}

debugStorage()