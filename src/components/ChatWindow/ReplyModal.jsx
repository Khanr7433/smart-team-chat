import React, { useState, useRef, useEffect } from 'react'
import { useAccessibility } from '../../hooks/useAccessibility'

const ReplyModal = ({ isOpen, onClose, smartReply }) => {
  const [selectedReply, setSelectedReply] = useState('')
  const modalRef = useRef(null)
  const { useFocusTrap } = useAccessibility()
  
  useFocusTrap(isOpen, modalRef)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleUseReply = () => {
    // In a real app, this would insert the reply into the message input
    console.log('Using smart reply:', selectedReply)
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reply-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg lg:rounded-xl max-w-sm sm:max-w-md lg:max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        tabIndex={-1}
      >
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex justify-between items-start mb-4 lg:mb-6">
            <h2 
              id="reply-modal-title"
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 pr-4"
            >
              Smart Reply Suggestion
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Close smart reply modal"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center mb-3 lg:mb-4">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full mr-2 lg:mr-3"></div>
              <span className="text-sm lg:text-base text-gray-600 font-medium">AI Suggested Response</span>
            </div>
            
            <div className="space-y-3 lg:space-y-4">
              <div 
                className={`p-4 lg:p-6 border-2 rounded-lg lg:rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedReply === smartReply 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => setSelectedReply(smartReply)}
                role="radio"
                tabIndex={0}
                aria-checked={selectedReply === smartReply}
                aria-labelledby="reply-option-label"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedReply(smartReply)
                  }
                }}
              >
                <p 
                  id="reply-option-label"
                  className="text-gray-800 lg:text-lg leading-relaxed"
                >
                  {smartReply}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg lg:rounded-xl p-4 lg:p-6 mb-6 lg:mb-8">
            <div className="flex items-start">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm lg:text-base text-yellow-800 leading-relaxed">
                  <strong>Prototype Note:</strong> In a real application, this would insert the selected reply into your message input field.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 lg:px-8 py-2 lg:py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg lg:rounded-xl transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleUseReply}
              disabled={!selectedReply}
              className="w-full sm:w-auto px-6 lg:px-8 py-2 lg:py-3 bg-green-500 text-white rounded-lg lg:rounded-xl hover:bg-green-600 active:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Use Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplyModal