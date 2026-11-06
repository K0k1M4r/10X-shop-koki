import type { Product, ProductsResponse } from '../types'
import { isProduct } from '../utils/guards'
import { ApiError } from './ApiError'

// am orze uech vkitxot

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc'

export const PAGE_SIZE = 12

const SORT_PARAMS: Record<
  Exclude<SortOption, 'default'>,
  { sortBy: string; order: string }
> = {
  'price-asc': { sortBy: 'price', order: 'asc' },
  'price-desc': { sortBy: 'price', order: 'desc' },
  'rating-desc': { sortBy: 'rating', order: 'desc' },
}

export interface ProductQuery {
  search: string
  category: string
  sort: SortOption
  page: number
}

export interface Category {
  slug: string
  name: string
}

export async function fetchProducts(
  query: ProductQuery,
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    skip: String((query.page - 1) * PAGE_SIZE),
  })

  if (query.sort !== 'default') {
    const sort = SORT_PARAMS[query.sort]
    params.set('sortBy', sort.sortBy)
    params.set('order', sort.order)
  }

  let path = '/products'
  if (query.search) {
    path = '/products/search'
    params.set('q', query.search)
  } else if (query.category) {
    path = `/products/category/${encodeURIComponent(query.category)}`
  }

  const response = await fetch(
    `https://dummyjson.com${path}?${params.toString()}`,
    { signal },
  )
  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to load products')
  }
  return response.json()
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('https://dummyjson.com/products/categories')
  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to load categories')
  }
  return response.json()
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to load product')
  }
  const data: unknown = await response.json()
  if (!isProduct(data)) {
    throw new ApiError(500, 'Received invalid product data')
  }
  return data
}