import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ParticipantInput, IcebreakerGenerator } from './'
import { navigateToHome, buildChatRoute } from '../../utils/navigation'

const NewChatContainer = () => {
  const navigate = useNavigate()
  const [participantName, setParticipantName] = useState('')
  const [isParticipantValid, setIsParticipantValid] = useState(false)
  const [selectedIcebreaker, setSelectedIcebreaker] = useState('')
  const [error, setError] = useState('')

  const validateParticipantName = (name) => {
    if (!name.trim()) {
      setError('Participant name is required')
      return false
    }
    if (name.trim().length < 2) {
      setError('Participant name must be at least 2 characters')
      return false
    }
    setError('')
    return true
  }

  const handleParticipantChange = (value) => {
    setParticipantName(value)
    const isValid = validateParticipantName(value)
    setIsParticipantValid(isValid)
  }

  const handleParticipantValidation = (isValid) => {
    setIsParticipantValid(isValid)
    if (!isValid && participantName.trim()) {
      setError('Participant name must be at least 2 characters')
    } else {
      setError('')
    }
  }

  const handleIcebreakerSelected = (icebreaker) => {
    setSelectedIcebreaker(icebreaker)
  }

  const handleStartChat = () => {
    if (!isParticipantValid) {
      setError('Please enter a valid participant name')
      return
    }

    // In a real app, this would create a new conversation in the backend
    // For now, we'll simulate creating a new conversation and navigate to it
    
    // Generate a new conversation ID (in real app, this would come from backend)
    const newConversationId = Date.now().toString()
    
    // For demo purposes, we'll navigate to a chat with the new ID
    // In a real implementation, you'd save the conversation data first
    console.log('Creating new chat:', {
      id: newConversationId,
      participantName: participantName.trim(),
      initialMessage: selectedIcebreaker || null
    })

    // Navigate to the new chat
    navigate(buildChatRoute(newConversationId))
  }

  const handleCancel = () => {
    navigateToHome(navigate)
  }

  return (
    <div className="max-w-sm sm:max-w-md lg:max-w-2xl mx-auto p-6 sm:p-8 lg:p-12 space-y-6 lg:space-y-8 lg:min-h-0">
      {/* Header */}
      <div className="text-center space-y-2 lg:space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Start New Chat</h1>
        <p className="text-gray-600 lg:text-lg max-w-lg mx-auto leading-relaxed">
          Enter a participant name and optionally use AI to generate conversation starters
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6 lg:space-y-8">
        {/* Participant Input */}
        <ParticipantInput
          value={participantName}
          onChange={handleParticipantChange}
          error={error}
          onValidation={handleParticipantValidation}
        />

        {/* Icebreaker Generator */}
        <IcebreakerGenerator
          participantName={participantName}
          onIcebreakerSelected={handleIcebreakerSelected}
        />

        {/* Selected Icebreaker Preview */}
        {selectedIcebreaker && (
          <div className="space-y-2 lg:space-y-3">
            <label className="block text-sm lg:text-base font-medium text-gray-700">
              Selected Icebreaker
            </label>
            <div className="p-4 lg:p-6 bg-blue-50 border border-blue-200 rounded-lg lg:rounded-xl">
              <p className="text-sm lg:text-base text-blue-900 leading-relaxed">
                {selectedIcebreaker}
              </p>
              <button
                onClick={() => setSelectedIcebreaker('')}
                className="mt-2 lg:mt-3 text-xs lg:text-sm text-blue-600 hover:text-blue-800 underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                Clear selection
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 lg:pt-6">
          <button
            onClick={handleCancel}
            className="w-full sm:flex-1 px-4 lg:px-6 py-3 lg:py-4 text-gray-700 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg lg:rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={handleStartChat}
            disabled={!isParticipantValid}
            className={`
              w-full sm:flex-1 px-4 lg:px-6 py-3 lg:py-4 rounded-lg lg:rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isParticipantValid
                ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-sm hover:shadow-md focus:ring-blue-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed focus:ring-gray-300'
              }
            `}
          >
            Start Chat
          </button>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs lg:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          {selectedIcebreaker 
            ? 'Your selected icebreaker will be ready to send when you start the chat'
            : 'You can start chatting immediately or use an AI-generated icebreaker'
          }
        </p>
      </div>
    </div>
  )
}

export default NewChatContainer