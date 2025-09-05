import { useNavigate, useLocation } from 'react-router-dom'

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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

      {/* Main content */}
      <main className="max-w-md mx-auto bg-white min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  )
}

export default Layout