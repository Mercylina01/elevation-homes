'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package, Truck, Award } from 'lucide-react'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=6')
        const data = await response.json()
        setFeaturedProducts(data.products || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Premium Furniture for Your Home
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto text-balance">
              Handcrafted household furniture designed with quality and style in mind. Shop our collection of beds, chairs, tables, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">Why Choose Elevation Homes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Quality Crafted</h3>
              <p className="text-slate-600">Handcrafted furniture built to last with premium materials</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Package className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Wide Selection</h3>
              <p className="text-slate-600">Browse hundreds of furniture pieces for every room</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Truck className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Fast Delivery</h3>
              <p className="text-slate-600">Quick delivery to your doorstep in Mukono</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {/* Home icon used here */}
                <span className="w-12 h-12 text-orange-600">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Custom Orders</h3>
              <p className="text-slate-600">Custom furniture tailored to your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Featured Products</h2>
          <p className="text-slate-600 mb-12 text-lg">Discover our most popular furniture pieces</p>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No products available yet.</p>
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent">
                View All Products <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
          <p className="text-lg mb-8">Visit our showroom in Mukono or browse our complete collection online</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent">
                Get in Touch
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-slate-100">
                Visit Our Showroom
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
