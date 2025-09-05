import { useState, useCallback } from 'react'
import { useToast } from '../components/common/Toast'

/**
 * Custom hook for managing async operations with loading states and error handling
 * @param {Function} asyncFunction - The async function to execute
 * @param {Object} options - Configuration options
 * @returns {Object} - { execute, isLoading, error, data, reset }
 */
export const useAsyncOperation = (asyncFunction, options = {}) => {
  const {
    onSuccess,
    onError,
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Operation completed successfully',
    errorMessage = 'Operation failed'
  } = options

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  
  const { showSuccess, showError } = useToast()

  const execute = useCallback(async (...args) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const result = await asyncFunction(...args)
      setData(result)
      
      if (onSuccess) {
        onSuccess(result)
      }
      
      if (showSuccessToast) {
        showSuccess(successMessage)
      }
      
      return result
    } catch (err) {
      const errorMsg = err.message || errorMessage
      setError(errorMsg)
      
      if (onError) {
        onError(err)
      }
      
      if (showErrorToast) {
        showError(errorMsg)
      }
      
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [asyncFunction, onSuccess, onError, showSuccessToast, showErrorToast, successMessage, errorMessage, showSuccess, showError])

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setData(null)
  }, [])

  return {
    execute,
    isLoading,
    error,
    data,
    reset
  }
}

export default useAsyncOperation