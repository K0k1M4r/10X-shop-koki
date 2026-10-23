import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem, Product } from '../types'

interface CartContextValue {
  items: CartItem[]
  totalQuantity: number
  addItem: (product: Product, quantity: number) => void
  removeItem: (id: number) => void
  setQuantity: (id: number, quantity: number) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextValue>({
  items: [],
  totalQuantity: 0,
  addItem: () => {},
  removeItem: () => {},
  setQuantity: () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, quantity: number) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item,
        )
      }
      return [
        ...current,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          stock: product.stock,
          quantity,
        },
      ]
    })
  }

  const removeItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const setQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    )
  }

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, totalQuantity, addItem, removeItem, setQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}