import React from 'react'

const IcebreakerModal = ({ isOpen, onClose, icebreakers, onSelectIcebreaker }) => {
  if (!isOpen) return null

  const handleSelectIcebreaker = (icebreaker) => {
    onSelectIcebreaker(icebreaker)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg lg:rounded-xl max-w-sm sm:max-w-lg lg:max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex justify-between items-start mb-4 lg:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 pr-4">AI Icebreaker Suggestions</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center mb-3 lg:mb-4">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full mr-2 lg:mr-3"></div>
              <span className="text-sm lg:text-base text-gray-600 font-medium">AI Generated Icebreakers</span>
            </div>
            <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
              Choose an icebreaker message to start your conversation, or use them as inspiration.
            </p>
          </div>

          <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
            {icebreakers.map((icebreaker, index) => (
              <div
                key={index}
                className="p-4 lg:p-6 border border-gray-200 rounded-lg lg:rounded-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                <p className="text-gray-800 lg:text-lg leading-relaxed group-hover:text-blue-900">
                  {icebreaker}
                </p>
                <div className="flex items-center justify-end mt-3 lg:mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs lg:text-sm text-blue-600 font-medium">Click to use</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 lg:px-8 py-2 lg:py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg lg:rounded-xl transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 lg:px-8 py-2 lg:py-3 bg-blue-500 text-white rounded-lg lg:rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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