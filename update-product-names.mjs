import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_SERVICE_ROLE_KEY,
)

// Map category IDs to realistic product names
const productNamesByCategory = {
  1: { // beds
    names: [
      'Mahogany King Size Bed',
      'Oak Queen Sleigh Bed',
      'Modern Platform Bed',
      'Classic Wooden Double Bed',
      'Elegant Upholstered Bed',
      'Rustic Pine Single Bed',
      'Contemporary Four-Poster Bed'
    ]
  },
  2: { // chairs
    names: [
      'Executive Office Chair',
      'Ergonomic Desk Chair',
      'Vintage Dining Chair',
      'Modern Accent Chair',
      'Leather Recliner Chair'
    ]
  },
  3: { // coffee-tables
    names: [
      'Glass Top Coffee Table',
      'Rustic Wooden Coffee Table',
      'Modern Marble Coffee Table',
      'Industrial Metal Coffee Table',
      'Classic Oak Coffee Table'
    ]
  },
  4: { // console-tables
    names: [
      'Elegant Hallway Console',
      'Modern Glass Console Table',
      'Vintage Wooden Console',
      'Slim Entryway Console',
      'Industrial Console Table'
    ]
  },
  5: { // dining-tables
    names: [
      'Solid Wood Dining Table',
      'Extendable Family Dining Table',
      'Modern Glass Dining Table',
      'Rustic Farmhouse Table',
      'Contemporary 6-Seater Table',
      'Elegant Mahogany Dining Set'
    ]
  },
  6: { // doors-and-frames
    names: [
      'Solid Mahogany Door',
      'Modern Flush Door',
      'Classic Paneled Door',
      'Security Steel Door',
      'French Double Doors',
      'Sliding Barn Door'
    ]
  },
  7: { // dressing-table
    names: [
      'Elegant Vanity Table',
      'Modern Dressing Table with Mirror',
      'Classic Wooden Dresser',
      'Contemporary Makeup Table',
      'Vintage Style Vanity'
    ]
  },
  8: { // storage-units
    names: [
      'Modular Storage Cabinet',
      'Wall-Mounted Shelf Unit',
      'Multi-Purpose Storage Chest',
      'Industrial Shelving Unit',
      'Modern Display Cabinet',
      'Wooden Storage Organizer',
      'Corner Storage Unit',
      'Tall Bookcase Cabinet',
      'Media Storage Console',
      'Utility Storage Rack',
      'Floating Shelf System',
      'Kitchen Pantry Cabinet',
      'Bedroom Storage Trunk'
    ]
  },
  9: { // mosquito-nets
    names: [
      'King Size Mosquito Net',
      'Double Bed Net with Frame',
      'Portable Mosquito Net',
      'Premium Treated Net',
      'Family Size Mosquito Net',
      'Deluxe Canopy Net'
    ]
  },
  10: { // sofas
    names: [
      'L-Shaped Sectional Sofa',
      'Modern 3-Seater Sofa',
      'Leather Chesterfield Sofa',
      'Contemporary Loveseat',
      'Reclining Sofa Set',
      'Classic Fabric Sofa',
      'Corner Modular Sofa',
      'Sleeper Sofa Bed',
      'Tufted Velvet Sofa',
      'Minimalist 2-Seater Couch'
    ]
  },
  11: { // tv-wall-units
    names: [
      'Modern TV Wall Unit',
      'Entertainment Center',
      'Floating TV Console',
      'Contemporary Media Wall',
      'Wooden TV Stand Unit',
      'Wall-Mounted Display Unit'
    ]
  },
  12: { // wardrobes
    names: [
      'Sliding Door Wardrobe',
      'Classic Wooden Wardrobe',
      'Modern Walk-In Closet',
      '3-Door Bedroom Wardrobe',
      'Corner Wardrobe Unit',
      'Mirrored Wardrobe',
      'Compact Single Wardrobe'
    ]
  }
}

// Category names for display
const categoryNames = {
  1: 'beds',
  2: 'chairs',
  3: 'coffee-tables',
  4: 'console-tables',
  5: 'dining-tables',
  6: 'doors-and-frames',
  7: 'dressing-table',
  8: 'storage-units',
  9: 'mosquito-nets',
  10: 'sofas',
  11: 'tv-wall-units',
  12: 'wardrobes'
}

async function updateProductNames() {
  console.log('🔄 Updating product names to realistic ones...\n')

  for (const [categoryId, config] of Object.entries(productNamesByCategory)) {
    const categoryName = categoryNames[categoryId]
    console.log(`📂 Processing ${categoryName}...`)

    // Get all products in this category by category_id
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, category_id')
      .eq('category_id', parseInt(categoryId))

    if (error) {
      console.error(`❌ Error fetching ${categoryName}:`, error.message)
      continue
    }

    if (!products || products.length === 0) {
      console.log(`⚠️  No products found for ${categoryName}\n`)
      continue
    }

    // Update each product with a realistic name
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const newName = config.names[i % config.names.length] // Cycle through names if more products than names
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ name: newName })
        .eq('id', product.id)

      if (updateError) {
        console.error(`   ❌ Failed to update ${product.name}:`, updateError.message)
      } else {
        console.log(`   ✅ ${product.name} → ${newName}`)
      }
    }

    console.log(`✅ Updated ${products.length} products in ${categoryName}\n`)
  }

  console.log('🎉 ALL PRODUCT NAMES UPDATED!')
}

updateProductNames()