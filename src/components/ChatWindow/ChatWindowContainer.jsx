import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MessageList from './MessageList'
import AIToolbar from './AIToolbar'
import LoadingSpinner from '../common/LoadingSpinner'
import { ConversationNotFoundState, ErrorState } from '../common/EmptyState'
import { useToast } from '../common/Toast'
import { getConversationById } from '../../data'

const ChatWindowContainer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [conversation, setConversation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { showError } = useToast()

  useEffect(() => {
    const loadConversation = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const conv = getConversationById(id)
        if (!conv) {
          setError('Conversation not found')
          return
        }
        
        setConversation(conv)
      } catch (err) {
        console.error('Error loading conversation:', err)
        setError(err.message || 'Failed to load conversation')
        showError('Failed to load conversation. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    if (id) {
      loadConversation()
    }
  }, [id, showError])

  const handleGoBack = () => {
    navigate('/')
  }

  const handleRetry = () => {
    window.location.reload()
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" text="Loading conversation..." />
      </div>
    )
  }

  // Error state
  if (error) {
    if (error === 'Conversation not found') {
      return (
        <div className="flex items-center justify-center h-full">
          <ConversationNotFoundState onGoBack={handleGoBack} />
        </div>
      )
    }
    
    return (
      <div className="flex items-center justify-center h-full">
        <ErrorState
          title="Failed to load conversation"
          description={error}
          onRetry={handleRetry}
        />
      </div>
    )
  }

  // No conversation found
  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full">
        <ConversationNotFoundState onGoBack={handleGoBack} />
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