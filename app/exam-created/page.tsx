'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ExamPanel from '../components/ExamPanel'

export default function ExamCreated() {
  const [examStarted, setExamStarted] = useState(false)
  const searchParams = useSearchParams()
  const examLink = searchParams.get('link') || ''

  if (examStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ExamPanel examLink={examLink} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Ready to Begin?</h1>
        <p className="text-gray-600 mb-8">Make sure you have enough time to complete the exam. Good luck!</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setExamStarted(true)}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
          >
            <span>Start Exam</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}