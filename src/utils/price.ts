import type { CartItem } from '../types'

export function discountedPrice(price: number, discountPercentage: number): number {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100
}

export function formatPrice(value: number): string {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function unitPrice(item: CartItem): number {
  return discountedPrice(item.price, item.discountPercentage)
}

export function lineTotal(item: CartItem): number {
  return Math.round(unitPrice(item) * item.quantity * 100) / 100
}

export function cartTotal(items: CartItem[]): number {
  return Math.round(items.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0) * 100) / 100
}