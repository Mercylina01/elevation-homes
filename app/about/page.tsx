'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Elevation Homes</h1>
          <p className="text-xl text-slate-200 max-w-2xl">
            Crafting quality furniture for homes in Mukono, Uganda
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-slate-600 mb-4">
                Elevation Homes was founded with a passion for creating quality, handcrafted furniture that transforms houses into homes. We believe that great furniture is an investment in comfort, style, and durability.
              </p>
              <p className="text-lg text-slate-600 mb-4">
                Based in Mukono, Ku Buteebe, we have been serving the community with exceptional furniture pieces for households. Each item is carefully crafted using premium materials and traditional techniques combined with modern design.
              </p>
              <p className="text-lg text-slate-600">
                Our commitment to quality and customer satisfaction has made us a trusted name in the furniture industry.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg h-96 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">10+</div>
                <p className="text-xl">Years of Craftsmanship</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Why Choose Elevation Homes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quality Craftsmanship</h3>
              <p className="text-slate-600">
                Each piece of furniture is handcrafted with attention to detail and made from premium, durable materials.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Custom Solutions</h3>
              <p className="text-slate-600">
                We offer custom furniture tailored to your specific needs, dimensions, and design preferences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Local Service</h3>
              <p className="text-slate-600">
                Located right here in Mukono, we provide quick delivery and excellent after-sales service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Visit Our Showroom
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">Our Location</h3>
                  <p className="text-slate-600">
                    Mukono, Ku Buteebe<br />
                    Uganda
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">Phone</h3>
                  <a href="tel:+256700000000" className="text-orange-600 hover:text-orange-700">
                    +256 700 000 000
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">Email</h3>
                  <a href="mailto:info@elevationhomes.ug" className="text-orange-600 hover:text-orange-700">
                    info@elevationhomes.ug
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">Business Hours</h3>
                  <p className="text-slate-600">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <Link href="/contact">
                <Button className="mt-6 bg-orange-600 hover:bg-orange-700">
                  Get in Touch
                </Button>
              </Link>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-slate-200 rounded-lg overflow-hidden h-96 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.744452321!2d32.7521!3d0.3526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbcf5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sElevation%20Homes%20Furniture%20Store!5e0!3m2!1sen!2sug!4v1674567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
