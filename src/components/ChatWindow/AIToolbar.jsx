import React, { useState, useCallback } from 'react'
import SummaryModal from './SummaryModal'
import ReplyModal from './ReplyModal'
import { ButtonSpinner } from '../common/LoadingSpinner'
import { useToast } from '../common/Toast'
import { useAccessibility } from '../../hooks/useAccessibility'
import { getSummaryForConversation, getRandomSmartReply } from '../../data'

const AIToolbar = React.memo(({ conversationId }) => {
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [currentSummary, setCurrentSummary] = useState(null)
  const [currentSmartReply, setCurrentSmartReply] = useState('')
  const [isLoadingSummary, setIsLoadingSummary] = useState(false)
  const [isLoadingReply, setIsLoadingReply] = useState(false)
  
  const { showError, showSuccess } = useToast()
  const { announceToScreenReader } = useAccessibility()

  const handleSummarizeThread = useCallback(async () => {
    setIsLoadingSummary(true)
    announceToScreenReader('Generating thread summary', 'assertive')
    try {
      const summary = await getSummaryForConversation(conversationId)
      setCurrentSummary(summary)
      setShowSummaryModal(true)
      showSuccess('Thread summary generated successfully!')
      announceToScreenReader('Thread summary ready. Summary modal opened.')
    } catch (error) {
      showError(error.message || 'Failed to generate summary. Please try again.')
      announceToScreenReader('Failed to generate summary')
    } finally {
      setIsLoadingSummary(false)
    }
  }, [conversationId, showError, showSuccess, announceToScreenReader])

  const handleSmartReply = useCallback(async () => {
    setIsLoadingReply(true)
    announceToScreenReader('Generating smart reply suggestion', 'assertive')
    try {
      const smartReply = await getRandomSmartReply()
      setCurrentSmartReply(smartReply)
      setShowReplyModal(true)
      showSuccess('Smart reply suggestion generated!')
      announceToScreenReader('Smart reply suggestion ready. Reply modal opened.')
    } catch (error) {
      showError(error.message || 'Failed to generate smart reply. Please try again.')
      announceToScreenReader('Failed to generate smart reply')
    } finally {
      setIsLoadingReply(false)
    }
  }, [showError, showSuccess, announceToScreenReader])

  return (
    <>
      <div 
        className="bg-gray-50 border-t border-gray-200 p-3 flex-shrink-0"
        role="toolbar"
        aria-label="AI assistance tools"
      >
        {/* Compact AI Buttons */}
        <div className="flex items-center justify-center space-x-3">
          {/* AI Label */}
          <div className="flex items-center text-xs text-gray-600 mr-2">
            <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-1.5">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            AI Tools:
          </div>

          {/* Summarize Button */}
          <button
            onClick={handleSummarizeThread}
            disabled={isLoadingSummary}
            className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 ${
              isLoadingSummary
                ? 'bg-blue-100 text-blue-600 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow focus:ring-blue-500'
            }`}
            aria-label={isLoadingSummary ? 'Generating thread summary' : 'Summarize conversation thread'}
            aria-describedby="summarize-description"
          >
            {isLoadingSummary ? (
              <svg className="w-3 h-3 animate-spin mr-1.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
            {isLoadingSummary ? 'Generating...' : 'Summarize'}
          </button>

          {/* Smart Reply Button */}
          <button
            onClick={handleSmartReply}
            disabled={isLoadingReply}
            className={`flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 ${
              isLoadingReply
                ? 'bg-green-100 text-green-600 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow focus:ring-green-500'
            }`}
            aria-label={isLoadingReply ? 'Generating smart reply suggestion' : 'Get smart reply suggestion'}
            aria-describedby="smart-reply-description"
          >
            {isLoadingReply ? (
              <svg className="w-3 h-3 animate-spin mr-1.5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
            {isLoadingReply ? 'Generating...' : 'Smart Reply'}
          </button>

          {/* Hidden descriptions for screen readers */}
          <div className="sr-only">
            <p id="summarize-description">
              Generate an AI summary of the current conversation thread
            </p>
            <p id="smart-reply-description">
              Get AI-generated reply suggestions for this conversation
            </p>
          </div>
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
})

export default AIToolbar