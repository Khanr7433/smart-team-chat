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
    <div className={`flex mb-4 lg:mb-6 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl ${isCurrentUser ? 'order-2' : 'order-1'}`}>
        {/* Sender name - only show for received messages */}
        {!isCurrentUser && (
          <div className="text-xs lg:text-sm text-gray-500 mb-1 lg:mb-2 px-1">
            {message.senderName}
          </div>
        )}
        
        {/* Message bubble */}
        <div
          className={`px-4 lg:px-5 py-2 lg:py-3 rounded-lg shadow-sm transition-all duration-200 ${
            isCurrentUser
              ? 'bg-blue-500 hover:bg-blue-600 text-white rounded-br-sm'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-bl-sm'
          }`}
        >
          <p className="text-sm lg:text-base leading-relaxed break-words">
            {message.content}
          </p>
        </div>
        
        {/* Timestamp */}
        <div className={`text-xs lg:text-sm text-gray-400 mt-1 lg:mt-2 px-1 ${
          isCurrentUser ? 'text-right' : 'text-left'
        }`}>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
      
      {/* Avatar for received messages */}
      {!isCurrentUser && (
        <div className="order-1 mr-3 lg:mr-4 flex-shrink-0">
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-2 ring-white shadow-sm">
            <span className="text-xs lg:text-sm font-medium text-white">
              {message.senderName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageBubble