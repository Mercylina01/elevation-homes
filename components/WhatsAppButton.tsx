'use client'

import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button after component mounts
    setIsVisible(true)
  }, [])

  const whatsappNumber = '256700000000'
  const defaultMessage = 'Hi Elevation Homes, I would like to inquire about your furniture'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Chat bubble notification */}
      <div className="bg-white rounded-lg shadow-xl p-4 border-2 border-green-500 animate-bounce hidden md:block max-w-xs">
        <p className="text-sm font-semibold text-foreground mb-2">Questions?</p>
        <p className="text-xs text-slate-600">Chat with our furniture experts on WhatsApp now!</p>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
      </div>

      {/* Main Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <div className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full p-4 shadow-2xl flex items-center gap-3 transition-all hover:scale-110 active:scale-95 duration-300 cursor-pointer"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
          <span className="font-bold hidden sm:inline pr-2">Chat Now</span>
        </div>
      </a>
    </div>
  )
}
