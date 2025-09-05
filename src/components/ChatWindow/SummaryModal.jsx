import React, { useRef, useEffect } from 'react'
import { useAccessibility } from '../../hooks/useAccessibility'

const SummaryModal = ({ isOpen, onClose, summary }) => {
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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8 modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg lg:rounded-xl max-w-sm sm:max-w-md lg:max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl modal-content"
        tabIndex={-1}
      >
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex justify-between items-start mb-4 lg:mb-6">
            <h2 
              id="summary-modal-title"
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 pr-4"
            >
              Thread Summary
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Close summary modal"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center mb-3 lg:mb-4">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-blue-500 rounded-full mr-2 lg:mr-3" aria-hidden="true"></div>
              <span className="text-sm lg:text-base text-gray-600 font-medium">AI Generated Summary</span>
            </div>
            <p 
              className="text-gray-800 lg:text-lg leading-relaxed"
              aria-describedby="summary-modal-title"
            >
              {summary?.content || 'No summary available for this conversation.'}
            </p>
          </div>

          {summary?.confidence && (
            <div className="mb-6 lg:mb-8 p-4 lg:p-6 bg-gray-50 rounded-lg lg:rounded-xl">
              <div className="flex items-center justify-between text-sm lg:text-base mb-3">
                <span className="text-gray-600 font-medium">Confidence Score</span>
                <span className="font-semibold text-gray-900">
                  {Math.round(summary.confidence * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                <div 
                  className="bg-blue-500 h-2 lg:h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${summary.confidence * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 lg:px-8 py-2 lg:py-3 bg-blue-500 text-white rounded-lg lg:rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryModal