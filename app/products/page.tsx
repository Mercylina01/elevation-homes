'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

// Match the category names exactly with your database
const CATEGORIES = [
  'All', 
  'Beds', 
  'Chairs', 
  'Coffee Tables',
  'Console Tables',
  'Dining Tables',
  'Doors and Frames',
  'Dressing Tables',
  'Mosquito Nets',
  'Sofas',
  'Storage Units',
  'Tv Wall Units',
  'Wardrobes'
]

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let url = '/api/products'
        const params = new URLSearchParams()

        if (selectedCategory !== 'All') {
          params.append('category', selectedCategory)
        }
        if (searchQuery) {
          params.append('search', searchQuery)
        }

        const response = await fetch(`${url}?${params.toString()}`)
        const data = await response.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchProducts, 500)
    return () => clearTimeout(debounceTimer)
  }, [selectedCategory, searchQuery])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {selectedCategory === 'All' ? 'Our Products' : selectedCategory}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            {selectedCategory === 'All' 
              ? 'Browse our wide selection of quality handcrafted furniture pieces'
              : `Explore our collection of ${selectedCategory.toLowerCase()}`
            }
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search furniture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2 border-slate-300"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <span className="text-slate-600 font-semibold mr-4 self-center">Category:</span>
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={selectedCategory === category ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : products.length > 0 ? (
            <div>
              <p className="text-slate-600 mb-6">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-slate-600 text-xl">
                {searchQuery ? 'No products found matching your search.' : 'No products available in this category.'}    
              </p>
              {searchQuery && (
                <Button
                  onClick={() => setSearchQuery('')}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}