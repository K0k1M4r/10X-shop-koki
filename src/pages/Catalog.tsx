import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchCategories, fetchProducts, PAGE_SIZE } from '../api/products'
import type { SortOption } from '../api/products'
import Pagination from '../components/Pagination'
import ProductGrid from '../components/ProductGrid'
import ProductSkeleton from '../components/ProductSkeleton'
import { useFetch } from '../hooks/useFetch'
import type { ProductsResponse } from '../types'
import type { AsyncState } from '../types/async'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default order' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Rating: high to low' },
]

function parseSort(value: string | null): SortOption {
  return SORT_OPTIONS.find((option) => option.value === value)?.value ?? 'default'
}

const controlClass =
  'rounded border border-gray-300 bg-white p-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'

function Catalog() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const sort = parseSort(params.get('sort'))
  const page = Math.max(1, Math.floor(Number(params.get('page'))) || 1)

  const [searchText, setSearchText] = useState(q)
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<{
    key: string
    state: AsyncState<ProductsResponse>
  } | null>(null)

  const { state: categoriesState } = useFetch(fetchCategories, null)
  const categories =
    categoriesState.status === 'success' ? categoriesState.data : []

  const queryKey = `${q}|${category}|${sort}|${page}|${attempt}`

  useEffect(() => {
    const controller = new AbortController()

    fetchProducts({ search: q, category, sort, page }, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return
        setResult({ key: queryKey, state: { status: 'success', data } })
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setResult({
          key: queryKey,
          state: {
            status: 'error',
            message: err instanceof Error ? err.message : 'Something went wrong',
          },
        })
      })

    return () => controller.abort()
  }, [q, category, sort, page, attempt, queryKey])

  const state: AsyncState<ProductsResponse> =
    result && result.key === queryKey ? result.state : { status: 'loading' }

  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(params)
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value)
      else next.delete(key)
    }
    setParams(next)
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    update({ q: searchText.trim(), category: '', page: '' })
  }

  function handleCategory(value: string) {
    setSearchText('')
    update({ category: value, q: '', page: '' })
  }

  function handleSort(value: string) {
    update({ sort: parseSort(value) === 'default' ? '' : value, page: '' })
  }

  function handlePage(next: number) {
    update({ page: next > 1 ? String(next) : '' })
    window.scrollTo({ top: 0 })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Catalog</h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={controlClass}
          />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300"
          >
            Search
          </button>
        </form>
        <select
          aria-label="Category"
          value={category}
          onChange={(e) => handleCategory(e.target.value)}
          className={controlClass}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Sort"
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className={controlClass}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        {(state.status === 'idle' || state.status === 'loading') && (
          <ProductSkeleton />
        )}

        {state.status === 'error' && (
          <div>
            <p className="text-red-600">Something went wrong: {state.message}</p>
            <button
              onClick={() => setAttempt((current) => current + 1)}
              className="mt-2 rounded border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100"
            >
              Retry
            </button>
          </div>
        )}

        {state.status === 'success' && state.data.products.length === 0 && (
          <p>No products found.</p>
        )}

        {state.status === 'success' && state.data.products.length > 0 && (
          <>
            <p className="mb-3 text-sm text-gray-600">
              Showing {state.data.skip + 1}–
              {state.data.skip + state.data.products.length} of {state.data.total}
            </p>
            <ProductGrid products={state.data.products} />
            <Pagination
              page={page}
              totalPages={Math.ceil(state.data.total / PAGE_SIZE)}
              onChange={handlePage}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Catalog