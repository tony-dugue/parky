import { useEffect, useState, useRef } from 'react'

export const useDebounce = <T>(
  value: T,
  delay = 1000,
): [T, { debouncing: boolean }] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [debouncing, setDebouncing] = useState<boolean>(false)

  const previousValueRef = useRef(value)

  useEffect(() => {
    if (previousValueRef.current === value) {
      return // pas de changement significatif
    }

    setDebouncing(true)

    const handler = setTimeout(() => {
      previousValueRef.current = value
      setDebouncedValue(value)
      setDebouncing(false)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return [debouncedValue, { debouncing }]
}
