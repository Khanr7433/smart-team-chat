import { useNavigate } from 'react-router-dom'
import { buildChatRoute } from '../../utils/navigation'

const ConversationItem = ({ conversation }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(buildChatRoute(conversation.id))
  }

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

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
      role="button"
      tabIndex={0}
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
          alt={`${conversation.participantName} avatar`}
          className="w-12 h-12 rounded-full object-cover bg-gray-200"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.participantName)}&background=6366f1&color=fff`
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {conversation.participantName}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {formatTimestamp(conversation.timestamp)}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate">
          {conversation.lastMessage}
        </p>
      </div>

      {/* Unread indicator */}
      {conversation.unreadCount > 0 && (
        <div className="flex-shrink-0 ml-2">
          <div className="bg-blue-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
            {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
          </div>
        </div>
      )}
    </div>
  )
}

export default ConversationItem