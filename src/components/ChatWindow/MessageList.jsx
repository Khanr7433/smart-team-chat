import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import { getMessagesForConversation } from '../../data'

const MessageList = ({ conversationId }) => {
  const messagesEndRef = useRef(null)
  
  // Get messages for the selected conversation
  const messages = getMessagesForConversation(conversationId)
  
  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
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
  
  // Handle case when conversation has no messages
  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-lg font-medium">No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </div>
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