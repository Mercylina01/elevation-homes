'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, Phone } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center text-white font-bold text-lg">
              EH
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg">Elevation Homes</span>
              <span className="text-xs text-gray-600">Furniture Store</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12">
            <Link href="/products" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Contact
            </Link>
            <a href="tel:+256700000000" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+256 700 000 000</span>
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-gray-700 hover:text-gray-900 transition">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t pt-4">
            <Link href="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Shop
            </Link>
            <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Contact
            </Link>
            <a href="tel:+256700000000" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Call: +256 700 000 000
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
