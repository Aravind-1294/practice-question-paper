'use client'

import Link from "next/link"

const LandingNavbar = () => {
  return (
    <div className="flex items-center justify-between py-4 px-8 bg-white shadow-md">
      <h1>Your logo</h1>
      <Link href="/Dashboard" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Get Started</Link>
    </div>
  )
}

export default LandingNavbar