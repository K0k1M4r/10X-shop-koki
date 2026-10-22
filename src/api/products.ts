import type { ProductsResponse } from '../types'

export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch('https://dummyjson.com/products')
  if (!response.ok) {
    throw new Error('Failed to load products')
  }
  return response.json()
}