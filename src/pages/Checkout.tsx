import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import type { CartItem, CheckoutFormValues } from '../types'
import { cartTotals, formatPrice, lineTotal } from '../utils/price'

interface Order {
  items: CartItem[]
  total: number
  fullName: string
}

const fields: { name: keyof CheckoutFormValues; label: string; type: string }[] = [
  { name: 'fullName', label: 'Full name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
]

function Checkout() {
  const { user } = useAuth()
  const { items, promoCode, clearCart } = useCart()
  const [values, setValues] = useState<CheckoutFormValues>({
    fullName: '',
    email: '',
    address: '',
    city: '',
  })
  const [errors, setErrors] = useState<Partial<CheckoutFormValues>>({})
  const [order, setOrder] = useState<Order | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => window.clearTimeout(timer.current)
  }, [])

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />
  }

  if (order) {
    return (
      <div className="mx-auto max-w-lg">
        <h1 className="text-2xl font-bold">Thank you! Your order has been placed.</h1>
        <p className="mt-2">Order for {order.fullName}</p>
        <ul className="mt-4 space-y-1">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatPrice(lineTotal(item))}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xl font-bold">
          Total: {formatPrice(order.total)}
        </p>
        <Link to="/" className="mt-4 inline-block text-blue-600 underline">
          Continue shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const { total } = cartTotals(items, promoCode)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (submitting) return

    const fullName = values.fullName.trim()
    const email = values.email.trim()
    const address = values.address.trim()
    const city = values.city.trim()
    const newErrors: Partial<CheckoutFormValues> = {}

    if (!fullName || fullName.length < 3)
      newErrors.fullName = 'Full name must be at least 3 characters'

    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = 'Please enter a valid email address'

    if (!address || address.length < 5)
      newErrors.address = 'Address must be at least 5 characters'

    if (!city) newErrors.city = 'City is required'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const snapshot: Order = { items, total, fullName }
    setSubmitting(true)
    timer.current = window.setTimeout(() => {
      setOrder(snapshot)
      clearCart()
      setSubmitting(false)
    }, 800)
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
      <p className="mb-4">
        {items.length} item(s) · Total: <strong>{formatPrice(total)}</strong>
      </p>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {submitting ? 'Placing order...' : 'Place order'}
        </button>
      </form>
    </div>
  )
}

export default Checkout