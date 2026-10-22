import { Link } from 'react-router-dom'
import type { Product } from '../types'

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-48 w-full bg-gray-100 object-contain"
      />
      <div className="p-3">
        <h2 className="font-semibold">{product.title}</h2>
        <p className="text-blue-600">${product.price}</p>
      </div>
    </Link>
  )
}

export default ProductCard