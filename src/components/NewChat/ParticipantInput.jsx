import { useState } from 'react'

const ParticipantInput = ({ value, onChange, error, onValidation }) => {
  const [touched, setTouched] = useState(false)

  const handleChange = (e) => {
    const newValue = e.target.value
    onChange(newValue)
    
    // Validate input
    if (onValidation) {
      const isValid = newValue.trim().length >= 2
      onValidation(isValid)
    }
  }

  const handleBlur = () => {
    setTouched(true)
  }

  const showError = touched && error

  return (
    <div className="space-y-2">
      <label 
        htmlFor="participant-name" 
        className="block text-sm font-medium text-gray-700"
      >
        Participant Name
      </label>
      <div className="relative">
        <input
          id="participant-name"
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter participant name..."
          className={`
            w-full px-4 py-3 border rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-colors duration-200
            ${showError 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
            }
          `}
          aria-invalid={showError}
          aria-describedby={showError ? 'participant-name-error' : undefined}
        />
        {showError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-red-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        )}
      </div>
      {showError && (
        <p 
          id="participant-name-error" 
          className="text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
      <p className="text-xs text-gray-500">
        Enter the name of the person you want to chat with
      </p>
    </div>
  )
}

export default ParticipantInput