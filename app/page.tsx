'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, MessageCircle, MapPin, Clock, Truck, Star } from 'lucide-react'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 })

  // Countdown timer for flash deals
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
          if (minutes < 0) {
            minutes = 59
            hours--
            if (hours < 0) {
              hours = 23
            }
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=8')
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }
        const data = await response.json()
        setFeaturedProducts(data.products || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Banner */}
      <section className="bg-white text-gray-900 py-12 md:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-red-600" />
                <span className="text-sm font-bold text-red-600 uppercase">LIMITED TIME OFFER</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">
                Premium Furniture Collection
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Discover our exclusive selection of handcrafted furniture pieces designed to elevate your living space.
              </p>
              <Link href="/products">
                <button className="bg-gray-900 text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className="hidden md:block flex-1">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Featured Collection</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                Featured Collections
              </h2>
              <p className="text-gray-600">Browse our curated selection of premium furniture</p>
            </div>
            <Link href="/products" className="hidden md:block">
              <button className="text-gray-700 hover:text-gray-900 font-semibold flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-80 animate-pulse">
                  <div className="bg-slate-200 h-48 rounded mb-4" />
                  <div className="bg-slate-200 h-4 rounded mb-2" />
                  <div className="bg-slate-200 h-4 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-500 text-lg">No products available at the moment</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            Why Choose Elevation Homes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="bg-gray-900 text-white rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing on all our furniture collections</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="bg-gray-900 text-white rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping to your home with reliable service</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="bg-gray-900 text-white rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">24/7 Support</h3>
              <p className="text-gray-600">Available on WhatsApp for all your inquiries</p>
            </div>
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
              <div className="bg-gray-900 text-white rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600">Handcrafted furniture built to last</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section with Map */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Easy Financing & Cash Discounts
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Located in Mukono, Ku Buteebe, Elevation Homes is your complete furniture destination. Visit our showroom to explore our full collection in person.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">Store Location</h4>
                    <p className="text-gray-600">Mukono, Ku Buteebe, Uganda</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Clock className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 8AM - 6PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/256700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block"
              >
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-semibold flex items-center gap-2 transition">
                  <MessageCircle className="w-5 h-5" />
                  Chat with Us
                </button>
              </a>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.744!2d32.752!3d0.353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbcf5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sElevation%20Homes%20Furniture%20Store!5e0!3m2!1sen!2sug!4v1674567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
