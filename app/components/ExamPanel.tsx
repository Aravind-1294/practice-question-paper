// 'use client'

// import { useState, useEffect } from 'react'
// import Link from "next/link"

// interface ExamQuestion {
//   correct_option: string
//   explanation: string
//   options: string[]
//   question: string
//   question_type: string
// }

// interface ExamData {
//   count: number
//   questions: ExamQuestion[]
//   status: string
// }

// interface ExamPanelProps {
//   examLink: string
// }

// export default function ExamPanel({ examLink }: ExamPanelProps) {
//   const [examData, setExamData] = useState<ExamData | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [answers, setAnswers] = useState<{ [key: number]: string }>({})
//   const [submitted, setSubmitted] = useState(false)
//   const [score, setScore] = useState<number | null>(null)
//   const [currentQuestion, setCurrentQuestion] = useState(0)

//   useEffect(() => {
//     const fetchExam = async () => {
//       try {
//         const response = await fetch(`/api/exam?link=${encodeURIComponent(examLink)}`)
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
//         const data = await response.json()
//         setExamData(data)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to load exam questions')
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (examLink) {
//       fetchExam()
//     }
//   }, [examLink])

//   const handleAnswerSelect = (questionIndex: number, answer: string) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionIndex]: answer
//     }))
//   }

//   const calculateScore = () => {
//     if (!examData) return 0
//     let correct = 0
//     examData.questions.forEach((question, index) => {
//       const userAnswer = answers[index]?.charAt(0)
//       if (userAnswer === question.correct_option) {
//         correct++
//       }
//     })
//     return (correct / examData.questions.length) * 100
//   }

//   const handleSubmit = () => {
//     const finalScore = calculateScore()
//     setScore(finalScore)
//     setSubmitted(true)
//   }

//   const getExamProgress = () => {
//     if (!examData) return { answered: 0, total: 0 }
//     return {
//       answered: Object.keys(answers).length,
//       total: examData.questions.length
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           <p className="text-gray-600">Loading exam questions...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center flex-col gap-4">
//         <div className="text-red-600 text-lg">{error}</div>
//         <button
//           onClick={() => window.location.reload()}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Try Again
//         </button>
//       </div>
//     )
//   }

//   if (!examData || !examData.questions) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-red-600 text-lg">No exam data available</div>
//       </div>
//     )
//   }

//   const progress = getExamProgress()

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {!submitted && (
//           <div className="bg-white shadow-lg rounded-lg mb-6 p-4">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-8">
//                 <div className="text-gray-600">
//                   <span className="font-medium">Questions:</span> {progress.answered} of {progress.total} answered
//                 </div>
//                 <div className="text-gray-600">
//                   <span className="font-medium">Remaining:</span> {progress.total - progress.answered}
//                 </div>
//               </div>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//               >
//                 Submit the Exam
//               </button>
//             </div>
//             <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${(progress.answered / progress.total) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         )}

//         <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//           {submitted ? (
//             <div className="p-6">
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Exam Completed!</h2>
//                 <div className="mb-8">
//                   <div className="text-6xl font-bold text-blue-600 mb-2">
//                     {score?.toFixed(1)}%
//                   </div>
//                   <p className="text-gray-600">
//                     You answered {progress.answered} out of {progress.total} questions
//                   </p>
//                 </div>

//                 <div className="space-y-6">
//                   {examData.questions.map((question, index) => (
//                     <div key={question.question} className="bg-gray-50 rounded-lg p-6 text-left">
//                       <p className="font-medium text-gray-800 mb-4">
//                         {index + 1}. {question.question}
//                       </p>
//                       <div className="space-y-2 text-black mb-4">
//                         {question.options.map((option, optIndex) => (
//                           <div
//                             key={option}
//                             className={`p-3 rounded-lg ${
//                               option.charAt(0) === question.correct_option
//                                 ? 'bg-green-100 border border-green-300'
//                                 : answers[index] === option.charAt(0)
//                                 ? 'bg-red-100 border border-red-300'
//                                 : 'bg-white border border-gray-200'
//                             }`}
//                           >
//                             {option}
//                           </div>
//                         ))}
//                       </div>
//                       <div className="mt-4 text-gray-600">
//                         <span className="font-medium">Explanation:</span> {question.explanation}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <Link href="/Dashboard"
                  
//                   className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
//                 >
//                   Back to Dashboard
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {examData.questions.map((question, index) => (
//                 <div key={index} className="p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-medium text-gray-800">
//                       Question {index + 1} of {examData.questions.length}
//                     </h3>
//                     <span className={`px-3 py-1 rounded-full text-sm ${
//                       answers[index] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                     }`}>
//                       {answers[index] ? 'Answered' : 'Not answered'}
//                     </span>
//                   </div>

//                   <p className="text-gray-800 mb-4">
//                     {question.question}
//                   </p>

//                   <div className="space-y-3">
//                     {question.options.map((option, optIndex) => (
//                       <label
//                         key={optIndex}
//                         className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer border transition-all
//                           ${answers[index] === option.charAt(0)
//                             ? 'border-blue-500 bg-blue-50'
//                             : 'border-gray-200 hover:bg-gray-50'
//                           }`}
//                       >
//                         <input
//                           type="radio"
//                           name={`question-${index}`}
//                           value={option.charAt(0)}
//                           checked={answers[index] === option.charAt(0)}
//                           onChange={() => handleAnswerSelect(index, option.charAt(0))}
//                           className="form-radio h-4 w-4 text-blue-600"
//                         />
//                         <span className="text-gray-700">{option}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"

interface ExamQuestion {
  correct_option: string
  explanation: string
  options: string[]
  question: string
  question_type: string
}

interface ExamData {
  count: number
  questions: ExamQuestion[]
  status: string
}

interface ExamPanelProps {
  examLink: string
}

export default function ExamPanel({ examLink }: ExamPanelProps) {
  const [examData, setExamData] = useState<ExamData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(`/api/exam?link=${encodeURIComponent(examLink)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setExamData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load exam questions')
      } finally {
        setLoading(false)
      }
    }

    if (examLink) {
      fetchExam()
    }
  }, [examLink])

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }))
  }

  const calculateScore = () => {
    if (!examData) return 0
    let correct = 0
    examData.questions.forEach((question, index) => {
      const userAnswer = answers[index]?.charAt(0)
      if (userAnswer === question.correct_option) {
        correct++
      }
    })
    return (correct / examData.questions.length) * 100
  }

  const handleSubmit = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setSubmitted(true)
  }

  const getExamProgress = () => {
    if (!examData) return { answered: 0, total: 0 }
    return {
      answered: Object.keys(answers).length,
      total: examData.questions.length
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading exam questions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="text-red-600 text-lg">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!examData || !examData.questions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-lg">No exam data available</div>
      </div>
    )
  }

  const progress = getExamProgress()

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {!submitted && (
          <div className="bg-white shadow-lg rounded-lg mb-6 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-8">
                <div className="text-gray-600">
                  <span className="font-medium">Questions:</span> {progress.answered} of {progress.total} answered
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">Remaining:</span> {progress.total - progress.answered}
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Submit the Exam
              </button>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(progress.answered / progress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {submitted ? (
            <div className="p-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Exam Completed!</h2>
                <div className="mb-8">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {score?.toFixed(1)}%
                  </div>
                  <p className="text-gray-600">
                    You answered {progress.answered} out of {progress.total} questions
                  </p>
                </div>

                <div className="space-y-6">
                  {examData.questions.map((question, index) => (
                    <div key={question.question} className="bg-gray-50 rounded-lg p-6 text-left">
                      <p className="font-medium text-gray-800 mb-4">
                        {index + 1}. {question.question}
                      </p>
                      <div className="space-y-2 text-black mb-4">
                        {question.options.map((option) => (
                          <div
                            key={option}
                            className={`p-3 rounded-lg ${
                              option.charAt(0) === question.correct_option
                                ? 'bg-green-100 border border-green-300'
                                : answers[index] === option.charAt(0)
                                ? 'bg-red-100 border border-red-300'
                                : 'bg-white border border-gray-200'
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-gray-600">
                        <span className="font-medium">Explanation:</span> {question.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/Dashboard"
                  
                  className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {examData.questions.map((question, index) => (
                <div key={index} className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Question {index + 1} of {examData.questions.length}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      answers[index] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {answers[index] ? 'Answered' : 'Not answered'}
                    </span>
                  </div>

                  <p className="text-gray-800 mb-4">
                    {question.question}
                  </p>

                  <div className="space-y-3">
                    {question.options.map((option, optIndex) => (
                      <label
                        key={optIndex}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer border transition-all
                          ${answers[index] === option.charAt(0)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}  // Ensure all options for a question have the same name
                          value={option.charAt(0)}
                          checked={answers[index] === option.charAt(0)}
                          onChange={() => handleAnswerSelect(index, option.charAt(0))}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}