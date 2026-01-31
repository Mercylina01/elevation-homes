'use client'

import React from "react"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react'
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
  const [addedToCart, setAddedToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const rating = Math.round((Math.random() * 2 + 3.5) * 10) / 10
  const reviewCount = Math.floor(Math.random() * 200 + 20)
  const discount = Math.floor(Math.random() * 30 + 10)
  const originalPrice = Math.round(product.price * (1 + discount / 100))

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
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

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(
      `https://wa.me/256700000000?text=Hi%20Elevation%20Homes%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}`,
      '_blank'
    )
  }

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-primary/20 group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 h-48">
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            -{discount}%
          </div>
        )}

        {/* Flash Deal Badge */}
        {discount > 20 && (
          <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
            <Zap className="w-3 h-3" />
            HOT
          </div>
        )}

        {/* Stock Status */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          {product.stock > 5 ? (
            <p className="text-white text-xs font-semibold">✓ In Stock</p>
          ) : product.stock > 0 ? (
            <p className="text-yellow-300 text-xs font-semibold">⚠ {product.stock} left!</p>
          ) : (
            <p className="text-red-400 text-xs font-semibold">Out of Stock</p>
          )}
        </div>

        {/* Product Image */}
        <Image
          src={product.image_url || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsWishlisted(!isWishlisted)
          }}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-all"
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        {/* Category Badge */}
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full w-fit">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="font-bold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-600">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black text-primary">
            UGX {product.price.toLocaleString()}
          </span>
          {originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleAddToCart(e)
          }}
          className="w-full bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
          {addedToCart ? 'Added!' : 'Add to Cart'}
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
        >
          WhatsApp
        </button>
      </div>
    </div>
  )
}
