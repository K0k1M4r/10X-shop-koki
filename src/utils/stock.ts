import type { Product } from '../types'

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

export const LOW_STOCK_LIMIT = 5

export function getStockStatus(product: Pick<Product, 'stock'>): StockStatus {
  if (product.stock === 0) return 'out-of-stock'
  if (product.stock <= LOW_STOCK_LIMIT) return 'low-stock'
  return 'in-stock'
}

export const STOCK_CLASSES: Record<StockStatus, string> = {
  'in-stock': 'text-green-600',
  'low-stock': 'text-orange-500',
  'out-of-stock': 'text-red-600',
}

export function stockLabel(product: Pick<Product, 'stock'>): string {
  const status = getStockStatus(product)
  if (status === 'out-of-stock') return 'Out of stock'
  if (status === 'low-stock') return `Only ${product.stock} left!`
  return 'In stock'
}