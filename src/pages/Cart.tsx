import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

function Cart() {
  const { items, removeItem, setQuantity } = useContext(CartContext)

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

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">${item.price} each</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="h-8 w-8 rounded border border-gray-300 bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => setQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                className="h-8 w-8 rounded border border-gray-300 bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>
            <p className="w-24 text-right font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <Link
          to="/checkout"
          className="rounded bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart