"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { NetworkBackground } from "@/components/NetworkBackground"

export default function LandingPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Use effect to mark when component is mounted on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle navigation to episodes page
  const navigateToEpisodes = () => {
    router.push('/episodes')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })

        if (response.ok) {
          setSubmitted(true)
          // Redirect to FreeFuse community page after a short delay
          setTimeout(() => {
            window.location.href = "https://freefuse.com/my-community/notyourfathersai"
          }, 2000) // 2 second delay to show the thank you message
        } else {
          console.error("Failed to submit email")
        }
      } catch (error) {
        console.error("Error submitting email:", error)
      }
    }
  }

  // Only render the full content on the client to avoid hydration issues
  if (!isClient) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700"></div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-purple-900/30"></div>
      
      {/* Neural Network Background */}
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delay"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Main content */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50 z-10">
        {/* Logo with glow effect */}
        <div className="flex flex-col items-center justify-center gap-3 mb-10 relative">
          <div className="relative w-24 h-24 drop-shadow-glow">
            <div className="absolute inset-0 bg-blue-500 rounded-full filter blur-xl opacity-30 animate-pulse"></div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NEW%20NYFAI%20LOGO%20FINAL%20-gU3pQWhFgwDclY3Sgk9zlVTB5250H5.png"
              alt="NYFAI Logo"
              fill
              className="object-contain relative z-10"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            NYFAI
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-4 text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Supercharge Your Content Marketing with AI</h2>
          <p className="text-gray-600">
            AI-powered content creation, SEO, and distribution to maximize your marketing impact.
          </p>
        </div>

        {/* Email Form */}
        {!submitted ? (
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-14 pl-4 pr-12 border-gray-300 bg-white/70 backdrop-blur-sm focus-visible:ring-blue-500 rounded-lg"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  suppressHydrationWarning
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-500" suppressHydrationWarning>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
                  </svg>
                </div>
              </div>
              <Button
                type="submit"
                className="h-14 w-full text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                  Get Early Access
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg text-center border border-purple-100">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank you for joining!</h3>
            <p className="text-gray-600 mb-2">We've received your email and will keep you updated on our launch.</p>
            <p className="text-sm text-blue-600">Redirecting you to our community page...</p>
          </div>
        )}

        {/* Footer with Social Links */}
        <div className="mt-10 space-y-6">
          <div className="flex items-center justify-center space-x-10">
            <a
              href="https://www.linkedin.com/company/not-your-father-s-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors duration-200 group flex items-center gap-1"
            >
              Social
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="https://freefuse.com/my-community/notyourfathersai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors duration-200 group flex items-center gap-1"
            >
              Community
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/episodes"
              className="text-gray-500 hover:text-gray-800 transition-colors duration-200 group flex items-center gap-1"
            >
              Episodes
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          <p className="text-xs text-gray-500 text-center">© {new Date().getFullYear()} NYFAI. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

