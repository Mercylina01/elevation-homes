import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('[v0] Debug endpoint called')
    
    // Check environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('[v0] Supabase URL exists:', !!url)
    console.log('[v0] Supabase Key exists:', !!key)
    
    if (!url || !key) {
      return NextResponse.json({
        error: 'Missing environment variables',
        url: !!url,
        key: !!key,
      }, { status: 500 })
    }

    // Try a simple fetch to Supabase
    const response = await fetch(`${url}/rest/v1/products?select=count(*)`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
      },
    })

    console.log('[v0] Raw response status:', response.status)
    const text = await response.text()
    console.log('[v0] Raw response:', text.substring(0, 100))
    
    return NextResponse.json({
      status: response.status,
      response: text.substring(0, 200),
      ok: response.ok,
    })
  } catch (error) {
    console.error('[v0] Debug error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 })
  }
}
