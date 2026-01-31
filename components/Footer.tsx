'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-gray-900 font-bold text-sm">
                EH
              </div>
              Elevation Homes
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium handcrafted furniture for your home in Mukono, Uganda.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Shop</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/products" className="hover:text-white transition text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=beds" className="hover:text-white transition text-sm">
                  Beds
                </Link>
              </li>
              <li>
                <Link href="/products?category=sofas" className="hover:text-white transition text-sm">
                  Sofas
                </Link>
              </li>
              <li>
                <Link href="/products?category=desks" className="hover:text-white transition text-sm">
                  Desks & Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://wa.me/256700000000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-sm">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Mukono, Ku Buteebe, Uganda</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <a href="tel:+256700000000" className="hover:text-white transition">
                  +256 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@elevationhomes.ug" className="hover:text-white transition">
                  info@elevationhomes.ug
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5" />
                <span>Mon - Sat: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2024 Elevation Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
