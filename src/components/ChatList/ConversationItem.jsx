import { useNavigate, useLocation } from 'react-router-dom'
import { buildChatRoute } from '../../utils/navigation'
import { useAccessibility } from '../../hooks/useAccessibility'

const ConversationItem = ({ conversation, isDesktopSidebar = false, index }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { announceToScreenReader, generateId } = useAccessibility()

  const handleClick = () => {
    navigate(buildChatRoute(conversation.id))
    announceToScreenReader(`Opened chat with ${conversation.participantName}`)
  }

  const isActive = location.pathname === buildChatRoute(conversation.id)
  const conversationId = generateId('conversation')

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (isDesktopSidebar) {
    // Desktop sidebar styling
    return (
      <div
        onClick={handleClick}
        className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
          isActive ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
        }`}
        role="button"
        tabIndex={0}
        data-index={index}
        aria-labelledby={`${conversationId}-name`}
        aria-describedby={`${conversationId}-message ${conversationId}-time`}
        aria-pressed={isActive}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 mr-3">
          <img
            src={conversation.avatar}
            alt=""
            role="presentation"
            className="w-12 h-12 rounded-full object-cover bg-gray-200"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.participantName)}&background=6366f1&color=fff`
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 
              id={`${conversationId}-name`}
              className={`text-sm font-semibold truncate ${isActive ? 'text-blue-900' : 'text-gray-900'}`}
            >
              {conversation.participantName}
            </h3>
            <span 
              id={`${conversationId}-time`}
              className="text-xs text-gray-500 flex-shrink-0 ml-2"
              aria-label={`Last message ${formatTimestamp(conversation.timestamp)}`}
            >
              {formatTimestamp(conversation.timestamp)}
            </span>
          </div>
          <p 
            id={`${conversationId}-message`}
            className={`text-sm truncate ${isActive ? 'text-blue-700' : 'text-gray-600'}`}
          >
            {conversation.lastMessage}
          </p>
        </div>

        {/* Unread indicator */}
        {conversation.unreadCount > 0 && (
          <div className="flex-shrink-0 ml-2">
            <div 
              className="bg-blue-500 text-white text-xs rounded-full min-w-[18px] h-5 flex items-center justify-center px-1.5 font-medium"
              aria-label={`${conversation.unreadCount} unread messages`}
              role="status"
            >
              {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Mobile/tablet styling
  return (
    <div
      onClick={handleClick}
      className="flex items-center p-4 sm:p-5 lg:p-6 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-blue-500"
      role="button"
      tabIndex={0}
      data-index={index}
      aria-labelledby={`${conversationId}-name-mobile`}
      aria-describedby={`${conversationId}-message-mobile ${conversationId}-time-mobile`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mr-3 lg:mr-4">
        <img
          src={conversation.avatar}
          alt=""
          role="presentation"
          className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover bg-gray-200 ring-2 ring-gray-100"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.participantName)}&background=6366f1&color=fff`
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1 lg:mb-2">
          <h3 
            id={`${conversationId}-name-mobile`}
            className="text-sm lg:text-base font-semibold text-gray-900 truncate"
          >
            {conversation.participantName}
          </h3>
          <span 
            id={`${conversationId}-time-mobile`}
            className="text-xs lg:text-sm text-gray-500 flex-shrink-0 ml-2 lg:ml-3"
            aria-label={`Last message ${formatTimestamp(conversation.timestamp)}`}
          >
            {formatTimestamp(conversation.timestamp)}
          </span>
        </div>
        <p 
          id={`${conversationId}-message-mobile`}
          className="text-sm lg:text-base text-gray-600 truncate leading-relaxed"
        >
          {conversation.lastMessage}
        </p>
      </div>

      {/* Unread indicator */}
      {conversation.unreadCount > 0 && (
        <div className="flex-shrink-0 ml-2 lg:ml-3">
          <div 
            className="bg-blue-500 text-white text-xs lg:text-sm rounded-full min-w-[20px] lg:min-w-[24px] h-5 lg:h-6 flex items-center justify-center px-1.5 lg:px-2 font-medium shadow-sm"
            aria-label={`${conversation.unreadCount} unread messages`}
            role="status"
          >
            {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
          </div>
        </div>
      )}
    </div>
  )
}

export default ConversationItem