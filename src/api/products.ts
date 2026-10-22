import type { Product, ProductsResponse } from '../types'

export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch('https://dummyjson.com/products')
  if (!response.ok) {
    throw new Error('Failed to load products')
  }
  return response.json()
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (!response.ok) {
    throw new Error('Product not found')
  }
  return response.json()
}