// 'use client'
// import { useState } from 'react'
// import LandingNavbar from './components/LandingNavbar'
// import DashboardNavbar from './components/DashboardNavbar'
// import Sidebar from './components/Sidebar'
// import LandingPage from './components/LandingPage'
// import Dashboard from './components/Dashboard'
// import CreateExamModal from './components/CreateExamModal'

// export default function Home() {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState('landingpage')

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'landingpage':
//         return <LandingPage />
//       case 'general':
//         return <Dashboard setIsModalOpen={setIsModalOpen} />
//       case 'generate':
//         return (
//           <div className="space-y-6">
//             <h1 className="text-3xl font-bold text-gray-900">Generate with Text</h1>
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <div className="flex flex-col items-center space-y-4">
//                 <textarea
//                   placeholder="Paste your text here to generate questions..."
//                   className="w-full h-48 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                 />
//                 <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
//                   Generate Questions
//                 </button>
//               </div>
//             </div>
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {activeTab === 'landingpage' ? (
//         <>
//           <LandingNavbar setActiveTab={setActiveTab} />
//           <main>
//             {renderContent()}
//           </main>
//         </>
//       ) : (
//         <>
//           <DashboardNavbar />
//           <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//           <main className="pl-64 pt-16">
//             <div className="max-w-7xl mx-auto px-8 py-8">
//               {renderContent()}
//             </div>
//           </main>
//           <CreateExamModal 
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//           />
//         </>
//       )}
//     </div>
//   )
// }

import React from 'react'
import LandingPage from './components/Landingpage'
export default function Page(){
  return (
    <>
      <LandingPage />
    </>
  )
}