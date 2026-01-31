'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-primary to-orange-500 shadow-2xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-primary font-black text-lg shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
              EH
            </div>
            <div className="flex flex-col hidden sm:block">
              <span className="text-lg font-black text-white leading-none">Elevation</span>
              <span className="text-xs font-bold text-yellow-100">Homes</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-white hover:text-yellow-100 font-semibold transition">
              Shop
            </Link>
            <Link href="/about" className="text-white hover:text-yellow-100 font-semibold transition">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-yellow-100 font-semibold transition">
              Contact
            </Link>
            <Link href="/cart">
              <Button size="sm" className="flex items-center gap-2 bg-white text-primary hover:bg-yellow-100 font-bold shadow-lg">
                <ShoppingCart className="w-4 h-4" />
                Cart
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/cart" className="text-white hover:text-yellow-100 transition">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-100 transition"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-primary/50 backdrop-blur rounded-lg mt-2">
            <Link href="/products" className="block px-4 py-2 text-white hover:text-yellow-100 hover:bg-white/10 rounded font-semibold">
              Shop
            </Link>
            <Link href="/about" className="block px-4 py-2 text-white hover:text-yellow-100 hover:bg-white/10 rounded font-semibold">
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-white hover:text-yellow-100 hover:bg-white/10 rounded font-semibold">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
