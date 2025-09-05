const MessageBubble = ({ message }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const isCurrentUser = message.isCurrentUser

  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
        {/* Sender name - only show for received messages */}
        {!isCurrentUser && (
          <div className="text-xs text-gray-500 mb-1 px-1">
            {message.senderName}
          </div>
        )}
        
        {/* Message bubble */}
        <div
          className={`px-4 py-2 rounded-lg shadow-sm ${
            isCurrentUser
              ? 'bg-blue-500 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-900 rounded-bl-sm'
          }`}
        >
          <p className="text-sm leading-relaxed break-words">
            {message.content}
          </p>
        </div>
        
        {/* Timestamp */}
        <div className={`text-xs text-gray-400 mt-1 px-1 ${
          isCurrentUser ? 'text-right' : 'text-left'
        }`}>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
      
      {/* Avatar for received messages */}
      {!isCurrentUser && (
        <div className="order-1 mr-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {message.senderName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageBubble