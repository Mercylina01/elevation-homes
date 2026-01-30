import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer_name, customer_email, customer_phone, customer_address, items, total_amount, payment_method } = body

    // Create order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_name,
          customer_email,
          customer_phone,
          customer_address,
          total_amount,
          payment_method,
          status: 'pending'
        }
      ])
      .select()

    if (orderError) throw orderError

    const orderId = orderData?.[0]?.id

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return NextResponse.json({ order: orderData?.[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')

    let query = supabase
      .from('orders')
      .select('*, order_items(*)')

    if (email) {
      query = query.eq('customer_email', email)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ orders: data || [] })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
