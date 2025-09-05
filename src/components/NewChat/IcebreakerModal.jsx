import React from 'react'

const IcebreakerModal = ({ isOpen, onClose, icebreakers, onSelectIcebreaker }) => {
  if (!isOpen) return null

  const handleSelectIcebreaker = (icebreaker) => {
    onSelectIcebreaker(icebreaker)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">AI Icebreaker Suggestions</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">AI Generated Icebreakers</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Choose an icebreaker message to start your conversation, or use them as inspiration.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {icebreakers.map((icebreaker, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors group"
                onClick={() => handleSelectIcebreaker(icebreaker)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelectIcebreaker(icebreaker)
                  }
                }}
              >
                <p className="text-gray-800 leading-relaxed group-hover:text-blue-900">
                  {icebreaker}
                </p>
                <div className="flex items-center justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-blue-600 font-medium">Click to use</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IcebreakerModal