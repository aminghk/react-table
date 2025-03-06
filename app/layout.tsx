import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/redux/provider"

export const metadata: Metadata = {
  title: "Data Tables App",
  description: "Users and Products Data Tables",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/your-kit-id.css" />
      </head>
      <body className="bg-grey min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}



import './globals.css'