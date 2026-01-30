import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Map category names to IDs (matches your seed script)
const categoryNameToId: { [key: string]: number } = {
  'Beds': 1,
  'Chairs': 2,
  'Coffee Tables': 3,
  'Console Tables': 4,
  'Dining Tables': 5,
  'Doors and Frames': 6,
  'Dressing Tables': 7,
  'Storage Units': 8,
  'Mosquito Nets': 9,
  'Sofas': 10,
  'Tv Wall Units': 11,
  'Wardrobes': 12,
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    // Join products with categories table to get category names
    let query = supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order('created_at', { ascending: false })

    // Filter by category if provided
    if (category && category !== 'All') {
      const categoryId = categoryNameToId[category]
      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }
    }

    // Search functionality
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ products: data || [] })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category_id, image_url, stock } = body

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price,
          category_id,
          image_url,
          stock: stock || 0
        }
      ])
      .select()

    if (error) throw error

    return NextResponse.json({ product: data?.[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}