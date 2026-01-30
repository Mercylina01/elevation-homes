'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id, quantity: 1 })
      })

      if (response.ok) {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
      }
    } catch (error) {
      console.error('Failed to add to cart:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative h-64 bg-slate-200 overflow-hidden group">
        {product.image_url ? (
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-600">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-orange-600 font-semibold uppercase mb-1">
              {product.category}
            </p>
            <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
              {product.name}
            </h3>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-slate-900">
            UGX {product.price.toLocaleString()}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            className={`flex-1 ${
              addedToCart
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {addedToCart ? 'Added!' : 'Add to Cart'}
          </Button>
          <Link href={`/products/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
