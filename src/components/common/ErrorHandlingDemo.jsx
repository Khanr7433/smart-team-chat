import React, { useState } from 'react'
import { useToast } from './Toast'
import { ButtonSpinner } from './LoadingSpinner'
import { getRandomSmartReply, getRandomIcebreaker, getSummaryForConversation } from '../../data'

/**
 * Demo component to test error handling and loading states
 * This component is for development/testing purposes only
 */
const ErrorHandlingDemo = () => {
  const [isTestingSmartReply, setIsTestingSmartReply] = useState(false)
  const [isTestingIcebreaker, setIsTestingIcebreaker] = useState(false)
  const [isTestingSummary, setIsTestingSummary] = useState(false)
  
  const { showSuccess, showError, showWarning, showInfo } = useToast()

  const testSmartReply = async () => {
    setIsTestingSmartReply(true)
    try {
      const reply = await getRandomSmartReply()
      showSuccess(`Smart reply generated: "${reply}"`)
    } catch (error) {
      showError(`Smart reply failed: ${error.message}`)
    } finally {
      setIsTestingSmartReply(false)
    }
  }

  const testIcebreaker = async () => {
    setIsTestingIcebreaker(true)
    try {
      const icebreaker = await getRandomIcebreaker()
      showSuccess(`Icebreaker generated: "${icebreaker}"`)
    } catch (error) {
      showError(`Icebreaker failed: ${error.message}`)
    } finally {
      setIsTestingIcebreaker(false)
    }
  }

  const testSummary = async () => {
    setIsTestingSummary(true)
    try {
      const summary = await getSummaryForConversation('1')
      showSuccess(`Summary generated: "${summary.content}"`)
    } catch (error) {
      showError(`Summary failed: ${error.message}`)
    } finally {
      setIsTestingSummary(false)
    }
  }

  const testToastTypes = () => {
    showInfo('This is an info message')
    setTimeout(() => showWarning('This is a warning message'), 500)
    setTimeout(() => showError('This is an error message'), 1000)
    setTimeout(() => showSuccess('This is a success message'), 1500)
  }

  const triggerError = () => {
    // Intentionally throw an error to test error boundary
    throw new Error('This is a test error for the error boundary')
  }

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Error Handling Demo</h3>
      
      <div className="space-y-2">
        <button
          onClick={testSmartReply}
          disabled={isTestingSmartReply}
          className="w-full flex items-center justify-center px-3 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-400"
        >
          {isTestingSmartReply && <ButtonSpinner className="mr-2" />}
          Test Smart Reply
        </button>
        
        <button
          onClick={testIcebreaker}
          disabled={isTestingIcebreaker}
          className="w-full flex items-center justify-center px-3 py-2 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-400"
        >
          {isTestingIcebreaker && <ButtonSpinner className="mr-2" />}
          Test Icebreaker
        </button>
        
        <button
          onClick={testSummary}
          disabled={isTestingSummary}
          className="w-full flex items-center justify-center px-3 py-2 text-xs bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-purple-400"
        >
          {isTestingSummary && <ButtonSpinner className="mr-2" />}
          Test Summary
        </button>
        
        <button
          onClick={testToastTypes}
          className="w-full px-3 py-2 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Test All Toasts
        </button>
        
        <button
          onClick={triggerError}
          className="w-full px-3 py-2 text-xs bg-red-500 text-white rounded hover:bg-red-600"
        >
          Trigger Error Boundary
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        Development only - tests error handling
      </p>
    </div>
  )
}

export default ErrorHandlingDemo