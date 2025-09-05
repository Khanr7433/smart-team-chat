import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ConversationItem from './ConversationItem'
import { conversations } from '../../data/conversations.json'

const ChatListContainer = ({ isDesktopSidebar = false }) => {
  const navigate = useNavigate()
  const [conversationList, setConversationList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredConversations, setFilteredConversations] = useState([])

  // Load conversations on component mount
  useEffect(() => {
    setConversationList(conversations)
    setFilteredConversations(conversations)
  }, [])

  // Filter conversations based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredConversations(conversationList)
    } else {
      const filtered = conversationList.filter(conversation =>
        conversation.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredConversations(filtered)
    }
  }, [searchTerm, conversationList])

  const handleNewChat = () => {
    navigate('/new-chat')
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  if (isDesktopSidebar) {
    // Desktop sidebar layout
    return (
      <div className="flex flex-col h-full">
        {/* Search input */}
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredConversations.length > 0 ? (
            <div>
              {filteredConversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isDesktopSidebar={true}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
              <svg className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-lg font-medium mb-2">No conversations found</p>
              <p className="text-sm text-center">Try adjusting your search</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Mobile/tablet layout
  return (
    <div className="flex flex-col h-full bg-white lg:h-[calc(100vh-120px)]">
      {/* Header with search */}
      <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">Messages</h1>
        
        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full pl-10 lg:pl-12 pr-3 py-2 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <svg className="h-12 w-12 lg:h-16 lg:w-16 mb-4 lg:mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-lg lg:text-xl font-medium mb-2">No conversations found</p>
            <p className="text-sm lg:text-base text-center max-w-sm">Try adjusting your search or start a new chat</p>
          </div>
        )}
      </div>

      {/* Floating action button for new chat - only on mobile */}
      <button
        onClick={handleNewChat}
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 lg:p-5 shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-50 lg:hidden"
        aria-label="Start new chat"
      >
        <svg className="h-6 w-6 lg:h-7 lg:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

export default ChatListContainer