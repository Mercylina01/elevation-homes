'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-500 rounded-lg flex items-center justify-center text-xs font-black text-white shadow-lg">
                EH
              </div>
              Elevation Homes
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Premium handcrafted furniture for your home. Located in the heart of Mukono, Uganda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-transparent bg-gradient-to-r from-primary to-orange-500 bg-clip-text">Shop</h3>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <Link href="/products" className="hover:text-primary transition text-sm font-medium">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=beds" className="hover:text-primary transition text-sm font-medium">
                  Beds
                </Link>
              </li>
              <li>
                <Link href="/products?category=sofas" className="hover:text-primary transition text-sm font-medium">
                  Sofas
                </Link>
              </li>
              <li>
                <Link href="/products?category=desks" className="hover:text-primary transition text-sm font-medium">
                  Desks & Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-transparent bg-gradient-to-r from-primary to-orange-500 bg-clip-text">Company</h3>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <Link href="/about" className="hover:text-primary transition text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition text-sm font-medium">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://wa.me/256700000000" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition text-sm font-medium flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-transparent bg-gradient-to-r from-primary to-orange-500 bg-clip-text">Contact</h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-start gap-2 group">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0 group-hover:scale-110 transition" />
                <span>Mukono, Ku Buteebe, Uganda</span>
              </li>
              <li className="flex items-center gap-2 group">
                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition" />
                <a href="tel:+256700000000" className="hover:text-primary transition">
                  +256 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-2 group">
                <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition" />
                <a href="mailto:info@elevationhomes.ug" className="hover:text-primary transition">
                  info@elevationhomes.ug
                </a>
              </li>
              <li className="flex items-start gap-2 group">
                <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0 group-hover:scale-110 transition" />
                <span>Mon - Sat: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 pt-8">
          <p className="text-center text-slate-400 text-sm">
            © 2024 Elevation Homes. All rights reserved. | Premium Furniture Store
          </p>
        </div>
      </div>
    </footer>
  )
}
