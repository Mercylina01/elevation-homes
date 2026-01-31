'use client'

import React from "react"
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    const message = "Hello Elevation Homes! I'd like to inquire about your furniture."
    const whatsappUrl = `https://wa.me/256700732114?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
            We're here to help! Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            How Can We Help You?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* WhatsApp Card - Featured */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <MessageCircle className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">WhatsApp</h3>
              <p className="text-green-50 text-center mb-6 text-sm">
                Chat with us instantly
              </p>
              <button 
                onClick={handleWhatsAppClick}
                className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Start Chat
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Phone Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-orange-100">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Phone className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Call Us</h3>
              <p className="text-slate-600 text-center mb-6 text-sm">
                Mon - Sat, 8AM - 6PM
              </p>
              <a href="tel:+256700732114" className="block">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  +256 700 73 2114
                </Button>
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-orange-100">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Mail className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Email</h3>
              <p className="text-slate-600 text-center mb-6 text-sm">
                We'll respond within 24hrs
              </p>
              <a href="mailto:elevation23@gmail.com" className="block">
                <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                  Send Email
                </Button>
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 border-2 border-orange-100">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <MapPin className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Visit Us</h3>
              <p className="text-slate-600 text-center mb-4 text-sm">
                Mukono, Ku Buteebe<br />
                Uganda
              </p>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Mukono+Ku+Buteebe+Uganda" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                  Get Directions
                </Button>
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-orange-600" />
              <h3 className="text-2xl font-bold text-slate-900">Business Hours</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="font-semibold text-slate-900">Monday - Saturday</p>
                <p className="text-slate-600">8:00 AM - 6:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Sunday</p>
                <p className="text-slate-600">Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
            Find Our Showroom
          </h2>
          <div className="bg-slate-200 rounded-2xl overflow-hidden shadow-2xl h-96 md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7444476556254!2d32.74701099999999!3d0.34856699999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc2e4f8d8d2d%3A0x1234567890abcdef!2sMukono%2C%20Ku%20Buteebe!5e0!3m2!1sen!2sug!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Get in touch today and let's create something beautiful together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleWhatsAppClick}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Message on WhatsApp
            </button>
            <a href="tel:+256700732114">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}