import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NYFAI - Not Your Father\'s AI',
  description: 'Supercharge Your Content Marketing with AI',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#4338ca" />
      </head>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
