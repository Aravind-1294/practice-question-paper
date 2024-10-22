"use client"
import {useState} from 'react'
import Sidebar from './Sidebar'
import Image from 'next/image'

interface DashboardProps {
  setIsModalOpen: (isOpen: boolean) => void
}

export default function Dashboard({ setIsModalOpen }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="pl-64">
      <div className="space-y-6 p-6">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Your Tests</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>Create Exam</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center py-12">
            <div className="relative w-48 h-48 mx-auto mb-4 opacity-50">
              <Image 
                src="/empty-state.svg" 
                alt="No tests" 
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="text-gray-500 text-lg">No tests created yet</p>
            <p className="text-gray-400 text-sm mt-1">
              Click the Create Exam button to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}