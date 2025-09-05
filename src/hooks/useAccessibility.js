import { useEffect, useRef } from 'react'

/**
 * Custom hook for managing accessibility features
 */
export const useAccessibility = () => {
  /**
   * Manages focus for modal dialogs
   * @param {boolean} isOpen - Whether the modal is open
   * @param {React.RefObject} modalRef - Reference to the modal element
   */
  const useFocusTrap = (isOpen, modalRef) => {
    const previousActiveElement = useRef(null)

    useEffect(() => {
      if (!isOpen) return

      // Store the previously focused element
      previousActiveElement.current = document.activeElement

      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus()
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          // Let the parent component handle escape key
          return
        }

        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )

          if (!focusableElements || focusableElements.length === 0) return

          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        
        // Restore focus to the previously focused element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus()
        }
      }
    }, [isOpen, modalRef])
  }

  /**
   * Announces messages to screen readers
   * @param {string} message - Message to announce
   * @param {string} priority - Priority level ('polite' or 'assertive')
   */
  const announceToScreenReader = (message, priority = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    // Remove the announcement after a short delay
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  /**
   * Generates unique IDs for accessibility attributes
   * @param {string} prefix - Prefix for the ID
   */
  const generateId = (prefix = 'accessible') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  }

  return {
    useFocusTrap,
    announceToScreenReader,
    generateId
  }
}

/**
 * Hook for managing keyboard navigation in lists
 * @param {Array} items - Array of items
 * @param {Function} onSelect - Function to call when an item is selected
 */
export const useKeyboardNavigation = (items, onSelect) => {
  const currentIndex = useRef(-1)

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        currentIndex.current = Math.min(currentIndex.current + 1, items.length - 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        currentIndex.current = Math.max(currentIndex.current - 1, 0)
        break
      case 'Home':
        e.preventDefault()
        currentIndex.current = 0
        break
      case 'End':
        e.preventDefault()
        currentIndex.current = items.length - 1
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (currentIndex.current >= 0 && items[currentIndex.current]) {
          onSelect(items[currentIndex.current])
        }
        break
      default:
        return
    }

    // Focus the current item
    const currentItem = document.querySelector(`[data-index="${currentIndex.current}"]`)
    if (currentItem) {
      currentItem.focus()
    }
  }

  return { handleKeyDown, currentIndex: currentIndex.current }
}