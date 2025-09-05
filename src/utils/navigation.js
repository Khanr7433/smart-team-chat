// Navigation utility functions

export const navigateToChat = (navigate, conversationId) => {
  navigate(`/chat/${conversationId}`)
}

export const navigateToNewChat = (navigate) => {
  navigate('/new-chat')
}

export const navigateToHome = (navigate) => {
  navigate('/')
}

export const navigateBack = (navigate) => {
  navigate(-1)
}

// Route constants
export const ROUTES = {
  HOME: '/',
  CHAT: '/chat/:id',
  NEW_CHAT: '/new-chat'
}

// Helper to build chat route
export const buildChatRoute = (conversationId) => `/chat/${conversationId}`