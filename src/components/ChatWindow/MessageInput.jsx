import React, { useState, useRef, useCallback } from 'react'
import { useAccessibility } from '../../hooks/useAccessibility'
import { useToast } from '../common/Toast'

const MessageInput = React.memo(({ conversationId, onSendMessage }) => {
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const textareaRef = useRef(null)
    const { announceToScreenReader } = useAccessibility()
    const { showSuccess, showError } = useToast()

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        const trimmedMessage = message.trim()
        if (!trimmedMessage || isSending) return

        setIsSending(true)
        announceToScreenReader('Sending message', 'assertive')

        try {
            // Simulate sending message
            await new Promise(resolve => setTimeout(resolve, 500))

            // Call the parent handler if provided
            if (onSendMessage) {
                onSendMessage(trimmedMessage)
            }

            // Clear the input
            setMessage('')

            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
            }

            showSuccess('Message sent successfully!')
            announceToScreenReader('Message sent')

        } catch (error) {
            showError('Failed to send message. Please try again.')
            announceToScreenReader('Failed to send message')
        } finally {
            setIsSending(false)
        }
    }, [message, isSending, onSendMessage, announceToScreenReader, showSuccess, showError])

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }, [handleSubmit])

    const handleInputChange = useCallback((e) => {
        setMessage(e.target.value)

        // Auto-resize textarea
        const textarea = e.target
        textarea.style.height = 'auto'
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }, [])

    const isDisabled = isSending || !message.trim()

    return (
        <div className="bg-white border-t border-gray-200 p-3 lg:p-4 flex-shrink-0">
            <form onSubmit={handleSubmit}>
                {/* Compact Input Container */}
                <div className="relative bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 focus-within:border-blue-400 focus-within:bg-white transition-all duration-200">
                    <div className="flex items-center p-2">
                        {/* Attachment Button */}
                        <button
                            type="button"
                            className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 mr-2"
                            aria-label="Attach file"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                        </button>

                        {/* Message Input */}
                        <div className="flex-1 relative">
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                disabled={isSending}
                                rows={1}
                                className="w-full px-2 py-1.5 text-sm bg-transparent border-0 resize-none focus:outline-none disabled:cursor-not-allowed transition-all duration-200 placeholder-gray-400"
                                style={{
                                    minHeight: '20px',
                                    maxHeight: '80px'
                                }}
                                aria-label="Type your message"
                                aria-describedby="message-input-help"
                            />

                            {/* Character count for long messages */}
                            {message.length > 200 && (
                                <div className="absolute -top-6 right-0 px-1.5 py-0.5 bg-gray-700 text-white text-xs rounded shadow-lg">
                                    {message.length}/1000
                                </div>
                            )}
                        </div>

                        {/* Emoji Button */}
                        <button
                            type="button"
                            className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 mx-1"
                            aria-label="Add emoji"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>

                        {/* Send Button */}
                        <button
                            type="submit"
                            disabled={isDisabled}
                            className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 ${isDisabled
                                ? 'bg-gray-200 cursor-not-allowed text-gray-400'
                                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow focus:ring-blue-500'
                                }`}
                            aria-label={isSending ? 'Sending message' : 'Send message'}
                            aria-describedby="send-button-help"
                        >
                            {isSending ? (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Hidden accessibility descriptions */}
                <div className="sr-only">
                    <p id="message-input-help">
                        Type your message and press Enter to send, or Shift+Enter for a new line
                    </p>
                    <p id="send-button-help">
                        Send the message to {conversationId ? 'the conversation' : 'start chatting'}
                    </p>
                </div>
            </form>
        </div>
    )
})

export default MessageInput