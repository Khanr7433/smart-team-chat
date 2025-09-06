import { useCallback, useRef, useEffect } from 'react'

export const useAccessibility = () => {
  const announcementRef = useRef(null)

  const announceToScreenReader = useCallback((message, priority = 'polite') => {
    if (!message) return

    // Create or update the live region for screen reader announcements
    let liveRegion = document.getElementById('sr-live-region')

    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = 'sr-live-region'
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.style.position = 'absolute'
      liveRegion.style.left = '-10000px'
      liveRegion.style.width = '1px'
      liveRegion.style.height = '1px'
      liveRegion.style.overflow = 'hidden'
      document.body.appendChild(liveRegion)
    }

    // Clear previous announcement and set new one
    liveRegion.textContent = ''
    setTimeout(() => {
      liveRegion.textContent = message
    }, 100)

    // Store reference for cleanup
    announcementRef.current = liveRegion
  }, [])

  const setFocusToElement = useCallback((elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.focus()
    }
  }, [])

  const trapFocus = useCallback((containerElement) => {
    if (!containerElement) return

    const focusableElements = containerElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    containerElement.addEventListener('keydown', handleTabKey)

    // Return cleanup function
    return () => {
      containerElement.removeEventListener('keydown', handleTabKey)
    }
  }, [])

  const getAriaLabel = useCallback((baseLabel, count, itemType = 'item') => {
    if (count === 0) {
      return `No ${itemType}s`
    } else if (count === 1) {
      return `${baseLabel}: 1 ${itemType}`
    } else {
      return `${baseLabel}: ${count} ${itemType}s`
    }
  }, [])

  const generateId = useCallback((prefix = 'element') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  const useFocusTrap = useCallback((isActive, containerRef) => {
    useEffect(() => {
      if (!isActive || !containerRef.current) return

      const container = containerRef.current
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      // Focus the first element when the trap becomes active
      if (firstElement) {
        firstElement.focus()
      }

      const handleTabKey = (e) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }

      container.addEventListener('keydown', handleTabKey)

      return () => {
        container.removeEventListener('keydown', handleTabKey)
      }
    }, [isActive, containerRef])
  }, [])

  return {
    announceToScreenReader,
    setFocusToElement,
    trapFocus,
    getAriaLabel,
    generateId,
    useFocusTrap
  }
}