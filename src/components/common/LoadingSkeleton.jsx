import React from 'react'

const LoadingSkeleton = ({ 
  type = 'conversation', 
  count = 3, 
  className = '' 
}) => {
  const renderConversationSkeleton = () => (
    <div className="flex items-center p-4 sm:p-5 lg:p-6 animate-pulse">
      <div className="flex-shrink-0 mr-3 lg:mr-4">
        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-200 rounded-full skeleton"></div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 bg-gray-200 rounded skeleton w-24 lg:w-32"></div>
          <div className="h-3 bg-gray-200 rounded skeleton w-12"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded skeleton w-full max-w-xs"></div>
      </div>
    </div>
  )

  const renderMessageSkeleton = () => (
    <div className="flex mb-4 lg:mb-6 animate-pulse">
      <div className="max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl">
        <div className="h-3 bg-gray-200 rounded skeleton w-20 mb-2"></div>
        <div className="px-4 lg:px-5 py-3 lg:py-4 bg-gray-200 rounded-lg skeleton">
          <div className="h-4 bg-gray-300 rounded skeleton w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded skeleton w-3/4"></div>
        </div>
        <div className="h-2 bg-gray-200 rounded skeleton w-16 mt-2"></div>
      </div>
    </div>
  )

  const renderChatHeaderSkeleton = () => (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 animate-pulse">
      <div className="flex items-center">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full mr-3 lg:mr-4 skeleton"></div>
        <div>
          <div className="h-5 bg-gray-200 rounded skeleton w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded skeleton w-16"></div>
        </div>
      </div>
    </div>
  )

  const renderSearchSkeleton = () => (
    <div className="p-4 sm:p-6 lg:p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded skeleton w-48 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded-lg skeleton w-full"></div>
    </div>
  )

  const renderSkeletonByType = () => {
    switch (type) {
      case 'conversation':
        return renderConversationSkeleton()
      case 'message':
        return renderMessageSkeleton()
      case 'chat-header':
        return renderChatHeaderSkeleton()
      case 'search':
        return renderSearchSkeleton()
      default:
        return renderConversationSkeleton()
    }
  }

  return (
    <div className={`${className}`} role="status" aria-label="Loading content">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          {renderSkeletonByType()}
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSkeleton