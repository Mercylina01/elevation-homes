'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
              EH
            </div>
            <span className="text-xl font-bold text-slate-900 hidden sm:inline">Elevation Homes</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-slate-600 hover:text-orange-600 transition">
              Products
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-orange-600 transition">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-orange-600 transition">
              Contact
            </Link>
            <Link href="/cart">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <ShoppingCart className="w-4 h-4" />
                Cart
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-orange-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/products" className="block px-2 py-2 text-slate-600 hover:text-orange-600 hover:bg-slate-50 rounded">
              Products
            </Link>
            <Link href="/about" className="block px-2 py-2 text-slate-600 hover:text-orange-600 hover:bg-slate-50 rounded">
              About
            </Link>
            <Link href="/contact" className="block px-2 py-2 text-slate-600 hover:text-orange-600 hover:bg-slate-50 rounded">
              Contact
            </Link>
            <Link href="/cart" className="block px-2 py-2 text-slate-600 hover:text-orange-600 hover:bg-slate-50 rounded">
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
