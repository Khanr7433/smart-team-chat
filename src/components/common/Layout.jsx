import { useNavigate, useLocation } from 'react-router-dom'
import { ChatListContainer } from '../ChatList'

const Layout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Chats'
      case '/new-chat':
        return 'New Chat'
      default:
        if (location.pathname.startsWith('/chat/')) {
          return 'Chat'
        }
        return 'Smart Team Chat'
    }
  }

  const showBackButton = location.pathname !== '/'

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-gray-100">
      {/* Mobile/Tablet Header - only show on smaller screens */}
      <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Go back"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900 flex-1 text-center">
            {getPageTitle()}
          </h1>
          {showBackButton && <div className="w-9" />} {/* Spacer for centering */}
        </div>
      </header>

      {/* Desktop Layout - WhatsApp style */}
      <div className="hidden lg:flex lg:h-screen">
        {/* Left Sidebar - Chat List */}
        <div className="w-80 xl:w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">Smart Team Chat</h1>
              <button
                onClick={() => navigate('/new-chat')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Start new chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Chat List */}
          <div className="flex-1 overflow-hidden">
            <ChatListContainer isDesktopSidebar={true} />
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col bg-white">
          {location.pathname === '/' ? (
            /* Welcome Screen when no chat is selected */
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-500 max-w-md">
                <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Smart Team Chat</h2>
                <p className="text-lg mb-6">Select a conversation from the sidebar to start chatting, or create a new conversation.</p>
                <button
                  onClick={() => navigate('/new-chat')}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Start New Chat
                </button>
              </div>
            </div>
          ) : location.pathname === '/new-chat' ? (
            /* New Chat Screen */
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="w-full max-w-2xl">
                {children}
              </div>
            </div>
          ) : (
            /* Chat content */
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Content */}
      <main className="lg:hidden bg-white min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  )
}

export default Layout