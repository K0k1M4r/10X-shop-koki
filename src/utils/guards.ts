import { ApiError } from '../api/ApiError'
import type { Product } from '../types'

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'number' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'price' in value &&
    typeof value.price === 'number' &&
    'discountPercentage' in value &&
    typeof value.discountPercentage === 'number' &&
    'stock' in value &&
    typeof value.stock === 'number' &&
    'thumbnail' in value &&
    typeof value.thumbnail === 'string' &&
    'images' in value &&
    Array.isArray(value.images)
  )
}