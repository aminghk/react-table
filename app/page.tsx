import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-black">Data Tables App</h1>
      <div className="flex gap-4">
        <Link
          href="/users"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Users Page
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue text-black font-semibold rounded-md hover:bg-yellow transition-colors"
        >
          Products Page
        </Link>
      </div>
    </main>
  )
}

