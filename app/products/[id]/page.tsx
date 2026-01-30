'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        const data = await response.json()
        setProduct(data.product)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity })
      })

      if (response.ok) {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h1>
          <p className="text-slate-600 mb-8">The product you are looking for does not exist.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/products" className="flex items-center text-orange-600 hover:text-orange-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </div>

      {/* Product Detail */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-slate-100 rounded-lg p-6 h-96">
              {product.image_url ? (
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain max-h-96"
                />
              ) : (
                <div className="text-slate-400 text-center">No Image Available</div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <p className="text-sm text-orange-600 font-semibold uppercase mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>
              <p className="text-slate-600 text-lg mb-6">
                {product.description}
              </p>

              <div className="bg-slate-50 p-6 rounded-lg mb-8">
                <p className="text-slate-600 text-sm mb-2">Price</p>
                <p className="text-4xl font-bold text-slate-900">
                  UGX {product.price.toLocaleString()}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center border border-slate-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0 bg-white outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className={`flex-1 ${
                    addedToCart
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </Button>
                <Link href="/contact" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full bg-transparent">
                    Ask a Question
                  </Button>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">About This Product</h3>
                <ul className="space-y-3 text-slate-600">
                  <li>✓ Handcrafted quality</li>
                  <li>✓ Durable materials</li>
                  <li>✓ Available for delivery in Mukono</li>
                  <li>✓ Custom modifications available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
