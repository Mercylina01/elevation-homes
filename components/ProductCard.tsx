'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heart, Eye } from 'lucide-react'
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
  const router = useRouter()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const discount = Math.floor(Math.random() * 35 + 10)
  const originalPrice = Math.round(product.price * (1 + discount / 100))
  const isNew = Math.random() > 0.5

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 h-56">
        {/* New Badge */}
        {isNew && (
          <div className="absolute top-3 left-3 z-10 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
            New
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
            -{discount}%
          </div>
        )}

        {/* Product Image */}
        <Image
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Wishlist & Quick View Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(`/products/${product.id}`, '_blank')
            }}
            className="flex-1 bg-white text-gray-900 py-2 rounded font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2 mr-2"
          >
            <Eye className="w-4 h-4" />
            Quick view
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsWishlisted(!isWishlisted)
            }}
            className="bg-white text-gray-900 p-2 rounded hover:bg-gray-100 transition"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isWishlisted ? 'fill-red-600 text-red-600' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs font-semibold text-gray-600 uppercase">
          {product.category}
        </span>

        {/* Product Name */}
        <h3
          onClick={() => router.push(`/products/${product.id}`)}
          className="font-bold text-gray-900 line-clamp-2 mt-2 cursor-pointer hover:text-gray-600 transition"
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-1 mt-1">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-3 mb-4">
          <span className="text-xl font-bold text-gray-900">
            ${(product.price / 100000).toFixed(2)}
          </span>
          {originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              ${(originalPrice / 100000).toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => router.push(`/products/${product.id}`)}
          className="w-full bg-gray-900 text-white py-2.5 rounded font-semibold hover:bg-gray-800 transition mb-2"
        >
          Select options
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            window.open(
              `https://wa.me/256700000000?text=Hi%20Elevation%20Homes%2C%20I%27m%20interested%20in%20${encodeURIComponent(
                product.name
              )}`,
              '_blank'
            )
          }}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition text-sm"
        >
          WhatsApp
        </button>
      </div>
    </div>
  )
}
