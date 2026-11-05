import type { Product, ProductsResponse } from '../types'
import { ApiError } from './ApiError'

// am orze uech vkitxot

export async function fetchProducts(limit = 12, skip = 0): Promise<ProductsResponse> {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
  )
  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to load products')
  }
  return response.json()
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to load product')
  }
  return response.json()
}