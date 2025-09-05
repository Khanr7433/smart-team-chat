// Data files will be imported from here
import conversationsData from './conversations.json'
import messagesData from './messages.json'
import aiResponsesData from './aiResponses.json'
import { withErrorHandling, createRetryFunction } from '../utils/errorHandling'

export const conversations = conversationsData.conversations
export const messageThreads = messagesData.messageThreads
export const aiResponses = aiResponsesData

// Helper functions for data access with error handling
export const getConversationById = (id) => {
  try {
    if (!id) throw new Error('Conversation ID is required')
    const conversation = conversations.find(conv => conv.id === id)
    if (!conversation) throw new Error(`Conversation with ID ${id} not found`)
    return conversation
  } catch (error) {
    console.error('Error getting conversation:', error)
    return null
  }
}

export const getMessagesForConversation = (conversationId) => {
  try {
    if (!conversationId) throw new Error('Conversation ID is required')
    return messageThreads[conversationId] || []
  } catch (error) {
    console.error('Error getting messages:', error)
    return []
  }
}

// Simulate async AI operations with loading states and potential errors
const _getRandomSmartReply = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
  
  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    const error = new Error('AI service temporarily unavailable')
    error.name = 'ServiceError'
    throw error
  }
  
  const replies = aiResponses.smartReplies
  if (!replies || replies.length === 0) {
    throw new Error('No smart replies available')
  }
  
  return replies[Math.floor(Math.random() * replies.length)]
}

const _getRandomIcebreaker = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800))
  
  // Simulate occasional failures (5% chance)
  if (Math.random() < 0.05) {
    const error = new Error('AI service temporarily unavailable')
    error.name = 'ServiceError'
    throw error
  }
  
  const icebreakers = aiResponses.icebreakers
  if (!icebreakers || icebreakers.length === 0) {
    throw new Error('No icebreakers available')
  }
  
  return icebreakers[Math.floor(Math.random() * icebreakers.length)]
}

const _getSummaryForConversation = async (conversationId) => {
  if (!conversationId) throw new Error('Conversation ID is required')
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
  
  // Simulate occasional failures (8% chance)
  if (Math.random() < 0.08) {
    const error = new Error('AI summarization service temporarily unavailable')
    error.name = 'ServiceError'
    throw error
  }
  
  const summary = aiResponses.summaries.find(summary => summary.conversationId === conversationId)
  if (!summary) {
    throw new Error('No summary available for this conversation')
  }
  
  return summary
}

// Export wrapped functions with error handling and retry logic
export const getRandomSmartReply = createRetryFunction(
  withErrorHandling(_getRandomSmartReply, 'getRandomSmartReply'),
  2, // max retries
  500 // base delay
)

export const getRandomIcebreaker = createRetryFunction(
  withErrorHandling(_getRandomIcebreaker, 'getRandomIcebreaker'),
  2,
  500
)

export const getSummaryForConversation = createRetryFunction(
  withErrorHandling(_getSummaryForConversation, 'getSummaryForConversation'),
  2,
  750
)