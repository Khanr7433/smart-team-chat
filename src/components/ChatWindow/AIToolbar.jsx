import React, { useState } from 'react'
import SummaryModal from './SummaryModal'
import ReplyModal from './ReplyModal'
import { getSummaryForConversation, getRandomSmartReply } from '../../data'

const AIToolbar = ({ conversationId }) => {
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [currentSummary, setCurrentSummary] = useState(null)
  const [currentSmartReply, setCurrentSmartReply] = useState('')

  const handleSummarizeThread = () => {
    const summary = getSummaryForConversation(conversationId)
    setCurrentSummary(summary)
    setShowSummaryModal(true)
  }

  const handleSmartReply = () => {
    const smartReply = getRandomSmartReply()
    setCurrentSmartReply(smartReply)
    setShowReplyModal(true)
  }

  return (
    <>
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={handleSummarizeThread}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            aria-label="Summarize conversation thread"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Summarize Thread
          </button>

          <button
            onClick={handleSmartReply}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm"
            aria-label="Get smart reply suggestion"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Smart Reply
          </button>
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
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