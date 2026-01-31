'use client'

import React from "react"
import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Trash2, ArrowLeft, MessageCircle, Mail } from 'lucide-react'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery')

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

  const handleWhatsAppOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all delivery information')
      return
    }

    // Create order summary
    let message = `*NEW ORDER FROM ELEVATION HOMES WEBSITE*\n\n`
    message += `*Customer Details:*\n`
    message += `Name: ${customerInfo.name}\n`
    message += `Phone: ${customerInfo.phone}\n`
    message += `Address: ${customerInfo.address}\n`
    message += `Payment: ${paymentMethod.replace('_', ' ').toUpperCase()}\n\n`
    message += `*Order Items:*\n`
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.products?.name}\n`
      message += `   Qty: ${item.quantity} × UGX ${item.products?.price.toLocaleString()}\n`
      message += `   Subtotal: UGX ${(item.products?.price * item.quantity).toLocaleString()}\n\n`
    })
    
    message += `*TOTAL: UGX ${calculateTotal().toLocaleString()}*`

    const whatsappUrl = `https://wa.me/256700732114?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    // Clear cart after sending
    setTimeout(() => {
      alert('Order sent! We will contact you shortly to confirm.')
      setCartItems([])
      setCustomerInfo({ name: '', phone: '', address: '' })
    }, 1000)
  }

  const handleEmailOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all delivery information')
      return
    }

    let subject = 'New Order from Website'
    let body = `NEW ORDER FROM ELEVATION HOMES WEBSITE\n\n`
    body += `Customer Details:\n`
    body += `Name: ${customerInfo.name}\n`
    body += `Phone: ${customerInfo.phone}\n`
    body += `Address: ${customerInfo.address}\n`
    body += `Payment Method: ${paymentMethod.replace('_', ' ').toUpperCase()}\n\n`
    body += `Order Items:\n`
    
    cartItems.forEach((item, index) => {
      body += `${index + 1}. ${item.products?.name}\n`
      body += `   Quantity: ${item.quantity} × UGX ${item.products?.price.toLocaleString()}\n`
      body += `   Subtotal: UGX ${(item.products?.price * item.quantity).toLocaleString()}\n\n`
    })
    
    body += `TOTAL: UGX ${calculateTotal().toLocaleString()}`

    const mailtoUrl = `mailto:elevation23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoUrl

    // Clear cart after sending
    setTimeout(() => {
      alert('Opening your email client. Please send the email to complete your order.')
      setCartItems([])
      setCustomerInfo({ name: '', phone: '', address: '' })
    }, 1000)
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
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700">Start Shopping</Button>
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
                          <p className="text-slate-600 mb-4 text-sm line-clamp-2">
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
                              className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                            >
                              −
                            </button>
                            <span className="px-4 py-2 font-semibold text-slate-900 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
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
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>UGX {calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery</span>
                      <span className="text-sm">Calculated at confirmation</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold text-slate-900 mb-8">
                    <span>Total</span>
                    <span className="text-orange-600">UGX {calculateTotal().toLocaleString()}</span>
                  </div>

                  {/* Checkout Form */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 mb-4">Delivery Information</h3>

                    <Input
                      type="text"
                      placeholder="Full Name *"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      required
                      className="border-slate-300"
                    />

                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      required
                      className="border-slate-300"
                    />

                    <Input
                      type="text"
                      placeholder="Delivery Address *"
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
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-600"
                      >
                        <option value="cash_on_delivery">Cash on Delivery</option>
                        <option value="mobile_money">Mobile Money</option>
                        <option value="bank_transfer">Bank Transfer</option>
                      </select>
                    </div>

                    <div className="pt-4 space-y-3">
                      <p className="text-sm text-slate-600 text-center mb-4">
                        Choose how to send your order:
                      </p>
                      
                      <Button
                        onClick={handleWhatsAppOrder}
                        size="lg"
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Order via WhatsApp
                      </Button>

                      <Button
                        onClick={handleEmailOrder}
                        size="lg"
                        variant="outline"
                        className="w-full border-orange-600 text-orange-600 hover:bg-orange-50"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Order via Email
                      </Button>
                    </div>

                    <p className="text-xs text-slate-500 text-center pt-4">
                      We'll contact you within 24 hours to confirm your order and delivery details.
                    </p>
                  </div>
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