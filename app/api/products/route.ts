import { NextRequest, NextResponse } from 'next/server'

// Mock products - reliable fallback data
const mockProducts = [
  {
    id: '1',
    name: 'Premium Leather Sofa',
    description: 'High-quality leather sofa set with elegant design and comfortable seating',
    price: 850000,
    category: 'Sofas',
    image_url: '/products/sofa.jpg',
    stock: 5,
  },
  {
    id: '2',
    name: 'Modern Wood Dining Table',
    description: 'Spacious dining table made from sustainable wood, seats 8 people',
    price: 550000,
    category: 'Tables',
    image_url: '/products/dining-table.jpg',
    stock: 3,
  },
  {
    id: '3',
    name: 'Luxury Bed Frame',
    description: 'King-size bed frame with premium wood and steel construction',
    price: 680000,
    category: 'Beds',
    image_url: '/products/king-bed.jpg',
    stock: 4,
  },
  {
    id: '4',
    name: 'Executive Office Desk',
    description: 'Professional office desk with storage compartments and cable management',
    price: 420000,
    category: 'Desks',
    image_url: '/products/study-desk.jpg',
    stock: 6,
  },
  {
    id: '5',
    name: 'Accent Armchair',
    description: 'Stylish accent chair perfect for reading corners or living spaces',
    price: 280000,
    category: 'Chairs',
    image_url: '/products/recliner.jpg',
    stock: 8,
  },
  {
    id: '6',
    name: 'Glass Coffee Table',
    description: 'Contemporary glass top coffee table with chrome legs',
    price: 195000,
    category: 'Tables',
    image_url: '/products/coffee-table.jpg',
    stock: 10,
  },
  {
    id: '7',
    name: 'Storage Cabinet',
    description: 'Multi-purpose wooden storage cabinet with shelves and drawers',
    price: 350000,
    category: 'Storage',
    image_url: '/products/wardrobe.jpg',
    stock: 5,
  },
  {
    id: '8',
    name: 'Kitchen Island',
    description: 'Modern kitchen island with built-in storage and counter space',
    price: 750000,
    category: 'Kitchen',
    image_url: '/products/gaming-desk.jpg',
    stock: 2,
  },
  {
    id: '9',
    name: 'Bar Stool Set',
    description: 'Set of 4 comfortable bar stools with footrest',
    price: 240000,
    category: 'Seating',
    image_url: '/products/bar-stools.jpg',
    stock: 12,
  },
  {
    id: '10',
    name: 'Bookcase Shelf',
    description: 'Tall wooden bookcase with 5 shelves for storage and display',
    price: 240000,
    category: 'Storage',
    image_url: '/products/bookcase.jpg',
    stock: 9,
  },
  {
    id: '11',
    name: 'Corner Sectional',
    description: 'Large L-shaped sectional sofa with storage and pullout bed',
    price: 1200000,
    category: 'Sofas',
    image_url: '/products/corner-sofa.jpg',
    stock: 3,
  },
  {
    id: '12',
    name: 'Vanity Dresser',
    description: 'Elegant wooden vanity with mirror and drawers for bedroom',
    price: 320000,
    category: 'Bedroom',
    image_url: '/products/bedside-table.jpg',
    stock: 7,
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100)
    const category = searchParams.get('category')

    let products = mockProducts

    // Filter by category if provided
    if (category && category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase())
    }

    // Apply limit
    products = products.slice(0, limit)

    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.error('[v0] API error:', error)
    return NextResponse.json({ products: mockProducts.slice(0, 20) }, { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, price, category, image_url, stock } = body

    // Return mock confirmation
    return NextResponse.json(
      {
        product: {
          id: String(mockProducts.length + 1),
          name,
          description,
          price,
          category,
          image_url,
          stock: stock || 0,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] POST error:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 400 })
  }
}
