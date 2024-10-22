import { Metadata } from 'next'
import LandingNavbar from './LandingNavbar'

export const metadata: Metadata = {
  title: 'Your App Name - Welcome',
  description: 'Description of your app',
}

const LandingPage = () => {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <div className="container mx-auto px-4">
        <div className="py-20">
          <h1 className="text-center text-6xl font-bold text-gray-900">
            Landing Page
          </h1>
          {/* Add more content sections like:
          - Hero section
          - Features
          - Testimonials
          - CTA sections
          */}
        </div>
      </div>
    </main>
  )
}

export default LandingPage