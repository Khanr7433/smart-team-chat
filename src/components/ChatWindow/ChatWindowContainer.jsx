import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MessageList from './MessageList'
import AIToolbar from './AIToolbar'
import { getConversationById } from '../../data'

const ChatWindowContainer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Get conversation details
  const conversation = getConversationById(id)
  
  // Handle case when conversation is not found
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-lg font-medium">Conversation not found</p>
          <p className="text-sm mb-4">The conversation you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Chat List
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex flex-col h-full lg:h-screen">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex-shrink-0">
        <div className="flex items-center">
          {/* Back button - only show on mobile/tablet */}
          <button
            onClick={() => navigate('/')}
            className="mr-3 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Back to chat list"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center">
            <img
              src={conversation.avatar}
              alt={conversation.participantName}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full mr-3 lg:mr-4 ring-2 ring-gray-100"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.participantName)}&background=6366f1&color=fff`
              }}
            />
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {conversation.participantName}
              </h1>
              <p className="text-sm lg:text-base text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Online
              </p>
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex ml-auto space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <MessageList conversationId={id} />
      
      {/* AI Toolbar */}
      <AIToolbar conversationId={id} />
    </div>
  )
}

export default ChatWindowContainer