import { useState } from 'react'
import { HomeIcon, SparklesIcon, BeakerIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface SidebarOption {
  id: string
  name: string
  icon: any
  disabled?: boolean
  tag?: string
}

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const sidebarOptions: SidebarOption[] = [
  { id: 'general', name: 'General', icon: HomeIcon },
  { id: 'generate', name: 'Generate with text', icon: SparklesIcon },
  { 
    id: 'ai', 
    name: 'AI Explanation', 
    icon: BeakerIcon, 
    disabled: true,
    tag: 'Available in next version'
  }
]

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Exam Portal</h1>
      </div>
      
      <nav className="mt-8">
        {sidebarOptions.map((option) => (
          <div key={option.id} className="relative">
            <button
              onClick={() => !option.disabled && setActiveTab(option.id)}
              className={clsx(
                'w-full flex items-center px-4 py-3 text-left',
                'transition-colors duration-200',
                {
                  'bg-blue-50 text-blue-600': activeTab === option.id && !option.disabled,
                  'text-gray-600 hover:bg-gray-50': activeTab !== option.id && !option.disabled,
                  'text-gray-400 cursor-not-allowed': option.disabled
                }
              )}
            >
              <option.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{option.name}</span>
              {option.tag && (
                <span className="absolute right-4 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                  {option.tag}
                </span>
              )}
            </button>
          </div>
        ))}
      </nav>
    </div>
  )
}