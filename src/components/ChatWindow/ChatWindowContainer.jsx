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
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-3 p-2 text-gray-400 hover:text-gray-600 transition-colors lg:hidden"
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
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {conversation.participantName}
              </h1>
              <p className="text-sm text-gray-500">Online</p>
            </div>
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