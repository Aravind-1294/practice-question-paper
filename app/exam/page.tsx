'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ExamData, ExamQuestion} from '../types/exam'

export default function ExamPanel() {
  const searchParams = useSearchParams()
  const examLink = searchParams.get('link')

  const [examData, setExamData] = useState<ExamData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(examLink || '')
        const data = await response.json()
        setExamData(data)
      } catch (err) {
        setError('Failed to load exam questions')
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
      const userAnswer = answers[index]?.charAt(0) // Get first character (A, B, C, or D)
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

  const isAllQuestionsAnswered = () => {
    if (!examData) return false
    return Object.keys(answers).length === examData.questions.length
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h1 className="text-2xl font-bold text-white">Online Exam</h1>
          </div>

          {submitted ? (
            <div className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Exam Completed!</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Your Score: {score?.toFixed(2)}%
                </p>
                <div className="space-y-4">
                  {examData?.questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <p className="font-medium text-gray-800 mb-2">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-green-600">
                        Correct Answer: Option {question.correct_option}
                      </p>
                      <p className="text-blue-600">
                        Your Answer: Option {answers[index]}
                      </p>
                      <p className="text-gray-600 mt-2">
                        Explanation: {question.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {examData?.questions.map((question, index) => (
                <div key={index} className="mb-8">
                  <p className="text-lg font-medium text-gray-800 mb-4">
                    {index + 1}. {question.question}
                  </p>
                  <div className="space-y-3">
                    {question.options.map((option, optIndex) => (
                      <label
                        key={optIndex}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
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

              <div className="mt-6 flex justify-between items-center">
                <span className="text-gray-600">
                  {Object.keys(answers).length} of {examData?.questions.length} questions answered
                </span>
                <button
                  onClick={handleSubmit}
                  disabled={!isAllQuestionsAnswered()}
                  className={`px-6 py-2 rounded-lg text-white font-medium
                    ${isAllQuestionsAnswered()
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  Submit Exam
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}