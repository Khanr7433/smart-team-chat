import React, { useState } from 'react'
import SummaryModal from './SummaryModal'
import ReplyModal from './ReplyModal'
import { ButtonSpinner } from '../common/LoadingSpinner'
import { useToast } from '../common/Toast'
import { getSummaryForConversation, getRandomSmartReply } from '../../data'

const AIToolbar = ({ conversationId }) => {
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [currentSummary, setCurrentSummary] = useState(null)
  const [currentSmartReply, setCurrentSmartReply] = useState('')
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [isLoadingReply, setIsLoadingReply] = useState(false)
  
  const { showError, showSuccess } = useToast()

  const handleSummarizeThread = async () => {
    setIsLoadingSummary(true)
    try {
      const summary = await getSummaryForConversation(conversationId)
      setCurrentSummary(summary)
      setShowSummaryModal(true)
      showSuccess('Thread summary generated successfully!')
    } catch (error) {
      showError(error.message || 'Failed to generate summary. Please try again.')
    } finally {
      setIsLoadingSummary(false)
    }
  }

  const handleSmartReply = async () => {
    setIsLoadingReply(true)
    try {
      const smartReply = await getRandomSmartReply()
      setCurrentSmartReply(smartReply)
      setShowReplyModal(true)
      showSuccess('Smart reply suggestion generated!')
    } catch (error) {
      showError(error.message || 'Failed to generate smart reply. Please try again.')
    } finally {
      setIsLoadingReply(false)
    }
  }

  return (
    <>
      <div className="bg-white border-t border-gray-200 p-4 sm:p-6 lg:p-8 flex-shrink-0">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
          <button
            onClick={handleSummarizeThread}
            disabled={isLoadingSummary}
            className={`w-full sm:w-auto flex items-center justify-center px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isLoadingSummary
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500'
            } text-white`}
            aria-label="Summarize conversation thread"
          >
            {isLoadingSummary ? (
              <ButtonSpinner className="mr-2 lg:mr-3" />
            ) : (
              <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
            <span className="text-sm lg:text-base font-medium">
              {isLoadingSummary ? 'Generating...' : 'Summarize Thread'}
            </span>
          </button>

          <button
            onClick={handleSmartReply}
            disabled={isLoadingReply}
            className={`w-full sm:w-auto flex items-center justify-center px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isLoadingReply
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-500'
            } text-white`}
            aria-label="Get smart reply suggestion"
          >
            {isLoadingReply ? (
              <ButtonSpinner className="mr-2 lg:mr-3" />
            ) : (
              <svg className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
            <span className="text-sm lg:text-base font-medium">
              {isLoadingReply ? 'Generating...' : 'Smart Reply'}
            </span>
          </button>
        </div>

        <div className="mt-3 lg:mt-4 text-center">
          <p className="text-xs lg:text-sm text-gray-500">
            AI-powered assistance for better communication
          </p>
        </div>
      </div>

      <SummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        summary={currentSummary}
      />

      <ReplyModal
        isOpen={showReplyModal}
        onClose={() => setShowReplyModal(false)}
        smartReply={currentSmartReply}
      />
    </>
  )
}

export default AIToolbar