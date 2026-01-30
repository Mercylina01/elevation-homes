'use client'

import React from "react"

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Trash2, ArrowLeft } from 'lucide-react'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      const data = await response.json()
      setCartItems(data.items || [])
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      await fetch(`/api/cart/${itemId}`, { method: 'DELETE' })
      setCartItems(cartItems.filter(item => item.id !== itemId))
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    try {
      await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      })
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ))
    } catch (error) {
      console.error('Failed to update quantity:', error)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.products?.price || 0
      return total + (itemPrice * item.quantity)
    }, 0)
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCheckingOut(true)

    try {
      const items = cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products?.price || 0
      }))

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          customer_address: customerInfo.address,
          items,
          total_amount: calculateTotal(),
          payment_method: paymentMethod
        })
      })

      if (response.ok) {
        setOrderPlaced(true)
        setCartItems([])
        setCustomerInfo({ name: '', email: '', phone: '', address: '' })
      }
    } catch (error) {
      console.error('Failed to place order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <section className="py-24">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-6 text-6xl">✓</div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for your order. We will contact you soon to confirm delivery details.
            </p>
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <p className="text-slate-600 mb-2">Confirmation email sent to:</p>
              <p className="font-semibold text-slate-900">{customerInfo.email}</p>
            </div>
            <div className="flex gap-4 justify-center flex-col sm:flex-row">
              <Link href="/products">
                <Button size="lg">Continue Shopping</Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/products" className="flex items-center text-orange-600 hover:text-orange-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
      </div>

      {/* Cart */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600 mb-6">Your cart is empty</p>
              <Link href="/products">
                <Button size="lg">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {item.products?.name}
                          </h3>
                          <p className="text-slate-600 mb-4 text-sm">
                            {item.products?.description}
                          </p>
                          <p className="text-lg font-semibold text-orange-600">
                            UGX {item.products?.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                          <div className="flex items-center border border-slate-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 font-semibold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary & Checkout */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>UGX {calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery</span>
                      <span>TBD</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold text-slate-900 mb-8">
                    <span>Total</span>
                    <span>UGX {calculateTotal().toLocaleString()}</span>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Delivery Information</h3>

                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      required
                      className="border-slate-300"
                    />

                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      required
                      className="border-slate-300"
                    />

                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      required
                      className="border-slate-300"
                    />

                    <Input
                      type="text"
                      placeholder="Delivery Address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      required
                      className="border-slate-300"
                    />

                    <div className="pt-4">
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Payment Method
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
                      >
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="cash_on_delivery">Cash on Delivery</option>
                        <option value="mobile_money">Mobile Money</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
