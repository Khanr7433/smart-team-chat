import { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import LoadingSpinner from '../common/LoadingSpinner'
import { NoMessagesState, ErrorState } from '../common/EmptyState'
import { useToast } from '../common/Toast'
import { getMessagesForConversation } from '../../data'

const MessageList = ({ conversationId }) => {
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const { showError } = useToast()

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
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleRetry = () => {
    window.location.reload()
  }

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
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading messages..." />
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
    <div className="flex-1 overflow-y-auto bg-gray-50 lg:bg-gray-25 py-4 lg:py-6 custom-scrollbar">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Messages list */}
        <div className="space-y-1 lg:space-y-2">
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
            />
          ))}
        </div>
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default MessageList