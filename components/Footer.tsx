'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-sm font-bold">
                EH
              </div>
              Elevation Homes
            </h3>
            <p className="text-slate-300 text-sm">
              Quality handcrafted furniture for your home. Located in Mukono, Uganda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/products" className="hover:text-orange-600 transition text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-600 transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-600 transition text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-orange-600 transition text-sm">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-orange-600 flex-shrink-0" />
                <span>Mukono, Ku Buteebe, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600" />
                <a href="tel:+256700000000" className="hover:text-orange-600 transition">
                  +256 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-600" />
                <a href="mailto:info@elevationhomes.ug" className="hover:text-orange-600 transition">
                  info@elevationhomes.ug
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-orange-600 flex-shrink-0" />
                <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-slate-400 text-sm">
            © 2024 Elevation Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
