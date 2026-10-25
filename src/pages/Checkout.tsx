import { useContext, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import type { CartItem, CheckoutFormValues } from '../types'

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
  const { user } = useContext(AuthContext)
  const { items, clearCart } = useContext(CartContext)
  const [values, setValues] = useState<CheckoutFormValues>({
    fullName: '',
    email: '',
    address: '',
    city: '',
  })
  const [errors, setErrors] = useState<Partial<CheckoutFormValues>>({})
  const [order, setOrder] = useState<Order | null>(null)

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />
  }

  if (order) {
    return (
      <div className="mx-auto max-w-lg">
        <h1 className="text-2xl font-bold">Thank you, {order.fullName}!</h1>
        <p className="mt-2">Your order has been placed.</p>
        <ul className="mt-4 space-y-1">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xl font-bold">
          Total: ${order.total.toFixed(2)}
        </p>
        <Link to="/" className="mt-4 inline-block text-blue-600 underline">
          Continue shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-4">Your cart is empty.</p>
        <Link to="/" className="text-blue-600 underline">
          Browse products
        </Link>
      </div>
    )
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const newErrors: Partial<CheckoutFormValues> = {}
    if (!values.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!values.email.trim()) newErrors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(values.email))
      newErrors.email = 'Enter a valid email'
    if (!values.address.trim()) newErrors.address = 'Address is required'
    if (!values.city.trim()) newErrors.city = 'City is required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setOrder({ items, total, fullName: values.fullName })
    clearCart()
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
      <p className="mb-4">
        {items.length} item(s) · Total: <strong>${total.toFixed(2)}</strong>
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
          className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
          Place order
        </button>
      </form>
    </div>
  )
}

export default Checkout