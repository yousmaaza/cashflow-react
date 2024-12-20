import { useCallback, useState } from 'react'

type AsyncFn<T> = (...args: any[]) => Promise<T>

export function useAsync<T>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(async (asyncFn: AsyncFn<T>, ...args: any[]) => {
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFn(...args)
      setData(result)
      return result
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'))
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { execute, loading, error, data }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}