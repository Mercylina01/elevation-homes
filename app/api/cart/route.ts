import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.cookies.get('session_id')?.value

    if (!sessionId) {
      return NextResponse.json({ items: [] })
    }

    const { data, error } = await supabase
      .from('cart_items')
      .select('*, products(*)')
      .eq('session_id', sessionId)

    if (error) throw error

    return NextResponse.json({ items: data || [] })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { product_id, quantity } = body
    let sessionId = request.cookies.get('session_id')?.value

    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random()}`
    }

    // Check if item already in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('session_id', sessionId)
      .eq('product_id', product_id)
      .single()

    if (existingItem) {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()

      if (error) throw error

      const response = NextResponse.json({ item: data?.[0] })
      response.cookies.set('session_id', sessionId, { maxAge: 86400 * 30 })
      return response
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ session_id: sessionId, product_id, quantity }])
      .select()

    if (error) throw error

    const response = NextResponse.json({ item: data?.[0] }, { status: 201 })
    response.cookies.set('session_id', sessionId, { maxAge: 86400 * 30 })
    return response
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    )
  }
}
