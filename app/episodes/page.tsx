"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Play } from "lucide-react"
import { NetworkBackground } from "@/components/NetworkBackground"
import { useRouter } from "next/navigation"

const episodes = [
  {
    number: 1,
    title: "That's So AI!",
    link: "https://bit.ly/3vFZkph",
  },
  {
    number: 2,
    title: "What's So Smart About 'Smart Devices'?",
    link: "https://bit.ly/3SaMNmk",
  },
  {
    number: 3,
    title: "My A.I. Digital Assistant Is Smarter Than Yours!",
    link: "https://bit.ly/3rcWAwS",
  },
  {
    number: 4,
    title: "Ready for Job Training in the Metaverse?",
    link: "https://bit.ly/3WkQCsd",
  },
  {
    number: 5,
    title: "Leverage AI to Automate Project Workflows",
    link: "https://bit.ly/3TPGB3z",
  },
  {
    number: 6,
    title: "Does Your PMO Have AI Super Powers?",
    link: "https://bit.ly/3GMFr4x",
  },
  {
    number: 7,
    title: "Supply Chains Love A.I. Too!",
    link: "https://bit.ly/3HWGcZs",
  },
]

export default function EpisodesPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  // Use effect to mark when component is mounted on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only render the full content on the client to avoid hydration issues
  if (!isClient) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700"></div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden relative">
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

      {/* Content */}
      <div className="w-full max-w-4xl px-4 py-12 z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <a
            href="/"
            className="self-start mb-8 text-black hover:text-gray-700 transition-colors duration-200 flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </a>

          <div className="relative w-20 h-20 drop-shadow-glow mb-4">
            <div className="absolute inset-0 bg-blue-500 rounded-full filter blur-xl opacity-30 animate-pulse"></div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NEW%20NYFAI%20LOGO%20FINAL%20-gU3pQWhFgwDclY3Sgk9zlVTB5250H5.png"
              alt="NYFAI Logo"
              fill
              className="object-contain relative z-10"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-black text-center mb-2">Not Your Father's A.I. Show</h1>
          <p className="text-black text-center max-w-2xl font-medium">
            Watch our episodes to learn how AI is transforming business and marketing
          </p>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {episodes.map((episode) => (
            <a key={episode.number} href={episode.link} target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/95 hover:scale-[1.02]">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    {episode.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                      {episode.title}
                    </h3>
                    <div className="flex items-center text-purple-700 font-medium">
                      <Play className="w-4 h-4 mr-1" />
                      Watch Episode {episode.number}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-purple-800 font-medium">© {new Date().getFullYear()} NYFAI. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

