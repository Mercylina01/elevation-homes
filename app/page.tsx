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

      {/* Flash Sale Hero Banner */}
      <section className="bg-gradient-to-r from-primary via-orange-500 to-yellow-500 text-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-yellow-200" />
                <span className="text-lg font-bold">FLASH SALE</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                Up to 50% OFF
              </h1>
              <p className="text-lg text-yellow-100">
                Premium furniture at unbeatable prices - Limited Time Only!
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur rounded-xl p-6 text-center min-w-max">
              <p className="text-sm font-semibold mb-2 text-yellow-200">Sale ends in:</p>
              <div className="flex gap-3 text-3xl font-bold">
                <div>
                  <div className="bg-white/20 rounded px-3 py-2">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <p className="text-xs mt-1">Hours</p>
                </div>
                <span>:</span>
                <div>
                  <div className="bg-white/20 rounded px-3 py-2">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <p className="text-xs mt-1">Mins</p>
                </div>
                <span>:</span>
                <div>
                  <div className="bg-white/20 rounded px-3 py-2">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <p className="text-xs mt-1">Secs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Quick Links */}
      <section className="bg-white py-6 border-b sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['All', 'Beds', 'Sofas', 'Desks', 'Chairs', 'Storage'].map((category) => (
              <Link key={category} href={`/products?category=${category.toLowerCase()}`}>
                <div className="p-4 rounded-lg border border-primary/20 hover:border-primary hover:shadow-md transition-all text-center cursor-pointer hover:bg-primary/5">
                  <span className="font-semibold text-sm text-primary">{category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Chat Button - Floating */}
      <a
        href="https://wa.me/256700000000?text=Hi%20Elevation%20Homes%2C%20I%20would%20like%20to%20inquire%20about%20your%20furniture"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 animate-bounce"
      >
        <div className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center gap-2 transition-all hover:scale-110">
          <MessageCircle className="w-6 h-6" />
          <span className="hidden sm:inline font-semibold">Chat with us</span>
        </div>
      </a>

      {/* Featured Products Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">
                Trending Now
              </h2>
              <p className="text-slate-600">Best-selling furniture pieces you'll love</p>
            </div>
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2">
                See All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-foreground">
            Why Elevation Homes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-xl border-2 border-primary/20">
              <div className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center mb-4 shadow-lg">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Flash Deals</h3>
              <p className="text-slate-600">Unbeatable prices on premium furniture every day</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border-2 border-primary/20">
              <div className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center mb-4 shadow-lg">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Fast Delivery</h3>
              <p className="text-slate-600">Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border-2 border-primary/20">
              <div className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center mb-4 shadow-lg">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Live Support</h3>
              <p className="text-slate-600">24/7 WhatsApp support for all your questions</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border-2 border-primary/20">
              <div className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center mb-4 shadow-lg">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Premium Quality</h3>
              <p className="text-slate-600">Handcrafted furniture built to last</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section with Map */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-foreground">
                Visit Us Today
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Located in the heart of Mukono at Ku Buteebe, Elevation Homes is your one-stop shop for premium furniture. Our showroom is open 6 days a week with expert staff ready to help you find the perfect pieces.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground">Address</h4>
                    <p className="text-slate-600">Mukono, Ku Buteebe, Uganda</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground">Hours</h4>
                    <p className="text-slate-600">Mon-Fri: 8AM - 6PM | Sat: 9AM - 4PM</p>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/256700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block"
              >
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Contact on WhatsApp
                </Button>
              </a>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border-4 border-primary/20 h-96">
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
