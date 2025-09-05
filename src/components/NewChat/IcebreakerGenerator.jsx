import { useState } from 'react'
import { aiResponses } from '../../data'
import IcebreakerModal from './IcebreakerModal'

const IcebreakerGenerator = ({ participantName, onIcebreakerSelected }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIcebreakers, setSelectedIcebreakers] = useState([])

  const generateIcebreakers = () => {
    // Get 3 random icebreakers from the data
    const shuffled = [...aiResponses.icebreakers].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 3)
    
    // Replace [name] placeholder with actual participant name
    const personalizedIcebreakers = selected.map(icebreaker => 
      icebreaker.replace('[name]', participantName || 'there')
    )
    
    setSelectedIcebreakers(personalizedIcebreakers)
    setIsModalOpen(true)
  }

  const handleSelectIcebreaker = (icebreaker) => {
    if (onIcebreakerSelected) {
      onIcebreakerSelected(icebreaker)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="space-y-3 lg:space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm lg:text-base font-medium text-gray-700">AI Assistance</h3>
          <div className="flex items-center text-xs lg:text-sm text-gray-500">
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full mr-1 lg:mr-2"></div>
            AI Ready
          </div>
        </div>
        
        <button
          onClick={generateIcebreakers}
          disabled={!participantName?.trim()}
          className={`
            w-full flex items-center justify-center px-4 lg:px-6 py-3 lg:py-4 rounded-lg lg:rounded-xl text-sm lg:text-base font-medium
            transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-2
            ${participantName?.trim()
              ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 active:from-green-700 active:to-blue-700 text-white border-transparent shadow-sm hover:shadow-md focus:ring-blue-500'
              : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed focus:ring-gray-300'
            }
          `}
          aria-label="Generate AI icebreaker suggestions"
        >
          <svg 
            className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-3" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
          Generate Icebreaker
        </button>
        
        <p className="text-xs lg:text-sm text-gray-500 text-center leading-relaxed">
          {participantName?.trim() 
            ? 'Get AI-powered conversation starters tailored for your chat'
            : 'Enter a participant name to generate personalized icebreakers'
          }
        </p>
      </div>

      <IcebreakerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        icebreakers={selectedIcebreakers}
        onSelectIcebreaker={handleSelectIcebreaker}
      />
    </>
  )
}

export default IcebreakerGenerator