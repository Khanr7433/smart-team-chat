import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import MessageBubble from './MessageBubble'
import LoadingSpinner from '../common/LoadingSpinner'
import LoadingSkeleton from '../common/LoadingSkeleton'
import { NoMessagesState, ErrorState } from '../common/EmptyState'
import { useToast } from '../common/Toast'
import { useAccessibility } from '../../hooks/useAccessibility'
import { getMessagesForConversation } from '../../data'

const MessageList = React.memo(({ conversationId }) => {
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { showError } = useToast()
  const { announceToScreenReader } = useAccessibility()

  // Load messages when conversationId changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!conversationId) {
        setMessages([])
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 200))
        
        const messageList = getMessagesForConversation(conversationId)
        setMessages(messageList || [])
        
        // Announce message count to screen readers
        const messageCount = messageList?.length || 0
        announceToScreenReader(
          `Loaded ${messageCount} message${messageCount !== 1 ? 's' : ''} in conversation`
        )
      } catch (err) {
        console.error('Error loading messages:', err)
        setError(err.message || 'Failed to load messages')
        showError('Failed to load messages. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadMessages()
  }, [conversationId, showError])
  
  // Auto-scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  
  useEffect(() => {
    if (messages.length > 0) {
      // Add a small delay to ensure DOM is updated
      const timeoutId = setTimeout(scrollToBottom, 100)
      return () => clearTimeout(timeoutId)
    }
  }, [messages, scrollToBottom])
  
  const handleRetry = useCallback(() => {
    window.location.reload()
  }, [])

  // Memoize the messages list to prevent unnecessary re-renders
  const messageElements = useMemo(() => {
    return messages.map((message, index) => (
      <div 
        key={message.id} 
        role="listitem"
        className="message-bubble"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <MessageBubble message={message} />
      </div>
    ))
  }, [messages])

  // Handle case when no conversation is selected
  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">💬</div>
          <p className="text-lg font-medium">Select a conversation</p>
          <p className="text-sm">Choose a chat from the list to start messaging</p>
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto bg-gray-50 lg:bg-gray-25 py-4 lg:py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSkeleton type="message" count={4} />
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <ErrorState
          title="Failed to load messages"
          description={error}
          onRetry={handleRetry}
        />
      </div>
    )
  }
  
  // Handle case when conversation has no messages
  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <NoMessagesState />
      </div>
    )
  }
  
  return (
    <div 
      className="flex-1 overflow-y-auto bg-gray-50 lg:bg-gray-25 py-4 lg:py-6 custom-scrollbar"
      role="log"
      aria-label="Chat messages"
      aria-live="polite"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Messages list */}
        <div 
          className="space-y-1 lg:space-y-2 stagger-animation"
          role="list"
          aria-label={`${messages.length} message${messages.length !== 1 ? 's' : ''} in conversation`}
        >
          {messageElements}
        </div>
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>
    </div>
  )
})

export default MessageList