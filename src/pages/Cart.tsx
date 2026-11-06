import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import QuantityPicker from '../components/QuantityPicker'
import { useCart } from '../hooks/useCart'
import { useToast } from '../hooks/useToast'
import {
  cartTotals,
  formatPrice,
  lineTotal,
  PROMO_PERCENT,
  unitPrice,
} from '../utils/price'

function Cart() {
  const {
    items,
    promoCode,
    removeItem,
    setQuantity,
    clearCart,
    applyPromo,
    removePromo,
  } = useCart()
  const { showToast } = useToast()
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="mt-4">Your cart is empty.</p>
        <Link to="/" className="text-blue-600 underline">
          Browse products
        </Link>
      </div>
    )
  }

  const { subtotal, discount, shipping, total } = cartTotals(items, promoCode)

  function handleApplyPromo(e: FormEvent) {
    e.preventDefault()
    if (applyPromo(promoInput)) {
      setPromoError(null)
      setPromoInput('')
      showToast('Promo code applied ✓')
    } else {
      setPromoError('Invalid promo code')
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Cart</h1>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center gap-4 rounded-lg bg-white p-3 shadow"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-16 w-16 rounded bg-gray-100 object-contain"
            />
            <div className="min-w-40 flex-1">
              <Link
                to={`/products/${item.id}`}
                className="font-semibold hover:underline"
              >
                {item.title}
              </Link>
              <p className="text-sm text-gray-500">
                {formatPrice(unitPrice(item))} each
              </p>
            </div>
            <QuantityPicker
              value={item.quantity}
              max={item.stock}
              onChange={(quantity) => setQuantity(item.id, quantity)}
            />
            <p className="w-24 text-right font-semibold">
              {formatPrice(lineTotal(item))}
            </p>
            <button
              onClick={() => {
                removeItem(item.id)
                showToast('Removed from cart')
              }}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-2 rounded-lg bg-white p-4 shadow">
        <form onSubmit={handleApplyPromo} noValidate className="mb-3">
          <label htmlFor="promo" className="block text-sm font-medium">
            Promo code
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id="promo"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="w-full max-w-xs rounded border border-gray-300 p-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Apply
            </button>
          </div>
          {promoError && (
            <p className="mt-1 text-sm text-red-600">{promoError}</p>
          )}
        </form>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {promoCode && (
          <div className="flex justify-between text-green-700">
            <span>
              Discount ({promoCode} −{PROMO_PERCENT}%){' '}
              <button
                onClick={removePromo}
                className="text-sm text-red-600 underline"
              >
                Remove
              </button>
            </span>
            <span>−{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => {
            if (window.confirm('Clear the cart? This cannot be undone.')) clearCart()
          }}
          className="rounded border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          Clear cart
        </button>
        <Link
          to="/checkout"
          className="rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart