import { createContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem, Product } from '../types'
import { isValidPromo, PROMO_CODE } from '../utils/price'
// aseve es vkitxot 
// igive reapeating codi ristvisaa daertebaa tu ra aris
interface CartContextValue {
  items: CartItem[]
  totalQuantity: number
  promoCode: string | null
  addItem: (product: Product, quantity: number) => void
  removeItem: (id: number) => void
  setQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  applyPromo: (code: string) => boolean
  removePromo: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextValue>({
  items: [],
  totalQuantity: 0,
  promoCode: null,
  addItem: () => {},
  removeItem: () => {},
  setQuantity: () => {},
  clearCart: () => {},
  applyPromo: () => false,
  removePromo: () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState<string | null>(null)

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
          discountPercentage: product.discountPercentage,
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

  const clearCart = () => {
    setItems([])
    setPromoCode(null)
  }

  const applyPromo = (code: string) => {
    if (!isValidPromo(code)) return false
    setPromoCode(PROMO_CODE)
    return true
  }

  const removePromo = () => setPromoCode(null)

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        promoCode,
        addItem,
        removeItem,
        setQuantity,
        clearCart,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}