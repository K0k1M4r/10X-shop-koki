import type { Product, ProductsResponse } from '../types'


// am orze uech vkitxot

export async function fetchProducts(limit = 12, skip = 0): Promise<ProductsResponse> {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
  )
  if (!response.ok) {
    throw new Error('Failed to load products')
  }
  return response.json()
}

export const PRODUCT_NOT_FOUND = 'Product not found'

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (response.status === 404) {
    throw new Error(PRODUCT_NOT_FOUND)
  }
  if (!response.ok) {
    throw new Error('Failed to load product')
  }
  return response.json()
}