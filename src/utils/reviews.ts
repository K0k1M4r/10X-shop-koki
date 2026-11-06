import type { Product } from '../types'
import type { Review } from '../types/review'

const STORAGE_KEY = 'shop_reviews'

interface ProductWithReviews extends Product {
  reviews?: unknown
}

export function isReview(value: unknown): value is Review {
  return (
    typeof value === 'object' &&
    value !== null &&
    'rating' in value &&
    typeof value.rating === 'number' &&
    'comment' in value &&
    typeof value.comment === 'string' &&
    'date' in value &&
    typeof value.date === 'string' &&
    'reviewerName' in value &&
    typeof value.reviewerName === 'string'
  )
}

export function getApiReviews(product: Product): Review[] {
  const withReviews: ProductWithReviews = product
  return Array.isArray(withReviews.reviews)
    ? withReviews.reviews.filter(isReview)
    : []
}

function readAll(): Record<string, Review[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return {}
    const result: Record<string, Review[]> = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (Array.isArray(value)) result[key] = value.filter(isReview)
    }
    return result
  } catch {
    return {}
  }
}

export function getLocalReviews(productId: number): Review[] {
  return readAll()[String(productId)] ?? []
}

export function addLocalReview(productId: number, review: Review): void {
  const all = readAll()
  all[String(productId)] = [review, ...(all[String(productId)] ?? [])]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    // storage can be full or blocked; the review still shows for this visit
  }
}