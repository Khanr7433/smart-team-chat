import { useEffect, useRef, useCallback } from 'react'

export const usePerformance = (componentName) => {
  const renderCount = useRef(0)
  const mountTime = useRef(null)

  useEffect(() => {
    mountTime.current = performance.now()
    renderCount.current = 0
    
    return () => {
      const unmountTime = performance.now()
      const lifespan = unmountTime - mountTime.current
      console.log(`Performance: ${componentName} lifespan: ${lifespan}ms, renders: ${renderCount.current}`)
    }
  }, [componentName])

  useEffect(() => {
    renderCount.current += 1
  })

  const measureFunction = useCallback((name, fn) => {
    return async (...args) => {
      const start = performance.now()
      try {
        const result = await fn(...args)
        const end = performance.now()
        console.log(`Performance: ${componentName}.${name} took ${end - start}ms`)
        return result
      } catch (error) {
        const end = performance.now()
        console.log(`Performance: ${componentName}.${name} failed after ${end - start}ms`)
        throw error
      }
    }
  }, [componentName])

  return { measureFunction }
}

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useThrottle = (callback, delay) => {
  const throttleRef = useRef(false)

  return useCallback((...args) => {
    if (!throttleRef.current) {
      callback(...args)
      throttleRef.current = true
      setTimeout(() => {
        throttleRef.current = false
      }, delay)
    }
  }, [callback, delay])
}

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    const currentTarget = targetRef.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [options])

  return [targetRef, isIntersecting]
}