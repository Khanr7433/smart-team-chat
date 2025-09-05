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
    <div className="max-w-md mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Start New Chat</h1>
        <p className="text-gray-600">
          Enter a participant name and optionally use AI to generate conversation starters
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Selected Icebreaker
            </label>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900 leading-relaxed">
                {selectedIcebreaker}
              </p>
              <button
                onClick={() => setSelectedIcebreaker('')}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear selection
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleStartChat}
            disabled={!isParticipantValid}
            className={`
              flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200
              ${isParticipantValid
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Start Chat
          </button>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
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