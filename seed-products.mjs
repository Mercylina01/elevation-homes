import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_SERVICE_ROLE_KEY
)

// Folder → category_id mapping (MATCHES YOUR categories table)
const categoryMap = {
  'beds': 1,
  'chairs': 2,
  'coffee-tables': 3,
  'console-tables': 4,
  'dining-tables': 5,
  'doors-and-frames': 6,
  'dressing-table': 7,
  'storage-units': 8,
  'mosquito-nets': 9,
  'sofas': 10,
  'tv-wall-units': 11,
  'wardrobes': 12,
}

const BUCKET = 'items';

async function seedProducts() {
  console.log('🔍 Starting seed process...\n')
  
  for (const folder in categoryMap) {
    const category_id = categoryMap[folder]

    console.log(`📂 Checking folder: ${folder}`)

    // 1. List images in folder
    const { data: files, error } = await supabase
      .storage
      .from(BUCKET)
      .list(folder)

    if (error) {
      console.error(`❌ Failed to read folder ${folder}:`, error.message)
      continue
    }

    if (!files || files.length === 0) {
      console.log(`⚠️ No images found in ${folder}\n`)
      continue
    }

    // Filter only image files
    const imageFiles = files.filter(file => 
      file.name && 
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)
    )

    if (imageFiles.length === 0) {
      console.log(`⚠️ No valid image files in ${folder}\n`)
      continue
    }

    console.log(`   Found ${imageFiles.length} images`)

    // 2. Convert images → products
    const products = imageFiles.map((file, index) => {
      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${folder}/${file.name}`
      
      console.log(`   📷 Image ${index + 1}: ${file.name}`)
      
      return {
        name: `${folder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${index + 1}`,
        description: `High quality ${folder.replace(/-/g, ' ')} made by Elevation Homes`,
        price: Math.floor(Math.random() * 400000) + 150000,
        image_url: imageUrl,
        category_id
      }
    })

    // 3. Insert into products table
    const { data, error: insertError } = await supabase
      .from('products')
      .insert(products)
      .select()

    if (insertError) {
      console.error(`❌ Insert failed for ${folder}:`, insertError.message)
      console.error('   Details:', insertError)
    } else {
      console.log(`✅ Inserted ${products.length} products for ${folder}`)
    }
    
    console.log('') // Empty line for readability
  }

  console.log('🎉 ALL PRODUCTS SEEDED SUCCESSFULLY')
}

seedProducts().catch(err => {
  console.error('💥 Seed process failed:', err)
  process.exit(1)
})