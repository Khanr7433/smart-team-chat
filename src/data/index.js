// Data files will be imported from here
import conversationsData from './conversations.json'
import messagesData from './messages.json'
import aiResponsesData from './aiResponses.json'

export const conversations = conversationsData.conversations
export const messageThreads = messagesData.messageThreads
export const aiResponses = aiResponsesData

// Helper functions for data access
export const getConversationById = (id) => {
  return conversations.find(conv => conv.id === id)
}

export const getMessagesForConversation = (conversationId) => {
  return messageThreads[conversationId] || []
}

export const getRandomSmartReply = () => {
  const replies = aiResponses.smartReplies
  return replies[Math.floor(Math.random() * replies.length)]
}

export const getRandomIcebreaker = () => {
  const icebreakers = aiResponses.icebreakers
  return icebreakers[Math.floor(Math.random() * icebreakers.length)]
}

export const getSummaryForConversation = (conversationId) => {
  return aiResponses.summaries.find(summary => summary.conversationId === conversationId)
}