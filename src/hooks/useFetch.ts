import { useEffect, useState } from 'react'
import type { AsyncState } from '../types/async'

interface FetchResult<T> {
  state: AsyncState<T>
  error: unknown
}

export function useFetch<T, A>(
  fetcher: (arg: A) => Promise<T>,
  arg: A,
): FetchResult<T> {
  const [result, setResult] = useState<FetchResult<T>>({
    state: { status: 'loading' },
    error: null,
  })

  useEffect(() => {
    let ignore = false

    fetcher(arg)
      .then((data) => {
        if (!ignore) setResult({ state: { status: 'success', data }, error: null })
      })
      .catch((err: unknown) => {
        if (ignore) return
        setResult({
          state: {
            status: 'error',
            message: err instanceof Error ? err.message : 'Something went wrong',
          },
          error: err,
        })
      })

    return () => {
      ignore = true
    }
  }, [fetcher, arg])

  return result
}