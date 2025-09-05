/**
 * Utility functions for error handling and logging
 */

/**
 * Formats error messages for user display
 * @param {Error|string} error - The error to format
 * @returns {string} - Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error
  }
  
  if (error instanceof Error) {
    // Handle specific error types
    if (error.name === 'NetworkError' || error.message.includes('fetch')) {
      return 'Network connection failed. Please check your internet connection and try again.'
    }
    
    if (error.name === 'TimeoutError') {
      return 'The request timed out. Please try again.'
    }
    
    if (error.message.includes('AI service')) {
      return 'AI service is temporarily unavailable. Please try again in a moment.'
    }
    
    return error.message || 'An unexpected error occurred'
  }
  
  return 'An unexpected error occurred'
}

/**
 * Logs errors with context information
 * @param {Error} error - The error to log
 * @param {string} context - Context where the error occurred
 * @param {Object} additionalInfo - Additional information to log
 */
export const logError = (error, context = '', additionalInfo = {}) => {
  const errorInfo = {
    message: error.message || 'Unknown error',
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...additionalInfo
  }
  
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.group(`🚨 Error in ${context}`)
    console.error('Error:', error)
    console.table(errorInfo)
    console.groupEnd()
  }
  
  // In production, you would send this to your error tracking service
  // Example: Sentry, LogRocket, Bugsnag, etc.
  // errorTrackingService.captureException(error, errorInfo)
}

/**
 * Creates a retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Function} - Retry function
 */
export const createRetryFunction = (fn, maxRetries = 3, baseDelay = 1000) => {
  return async (...args) => {
    let lastError
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn(...args)
      } catch (error) {
        lastError = error
        
        if (attempt === maxRetries) {
          throw error
        }
        
        // Exponential backoff with jitter
        const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
        
        logError(error, `Retry attempt ${attempt + 1}/${maxRetries}`, { args })
      }
    }
    
    throw lastError
  }
}

/**
 * Wraps async functions with error handling
 * @param {Function} fn - Async function to wrap
 * @param {string} context - Context for error logging
 * @returns {Function} - Wrapped function
 */
export const withErrorHandling = (fn, context) => {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      logError(error, context, { args })
      throw error
    }
  }
}

/**
 * Checks if an error is recoverable (user can retry)
 * @param {Error} error - The error to check
 * @returns {boolean} - Whether the error is recoverable
 */
export const isRecoverableError = (error) => {
  const recoverablePatterns = [
    /network/i,
    /timeout/i,
    /temporarily unavailable/i,
    /service unavailable/i,
    /connection/i
  ]
  
  const errorMessage = error.message || ''
  return recoverablePatterns.some(pattern => pattern.test(errorMessage))
}