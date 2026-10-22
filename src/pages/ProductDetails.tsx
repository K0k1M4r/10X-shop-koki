import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../api/products'
import type { Product } from '../types'

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let ignore = false

    fetchProduct(id)
      .then((data) => {
        if (!ignore) setProduct(data)
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) return <p>Loading product...</p>

  if (error || !product) {
    return (
      <div>
        <p className="text-red-600">{error ?? 'Product not found'}</p>
        <Link to="/" className="text-blue-600 underline">
          Back to catalog
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/" className="text-blue-600 underline">
        ← Back to catalog
      </Link>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full rounded-lg bg-gray-100 object-contain"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <p className="mt-4">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-blue-600">
            ${product.price}
          </p>
          <p className="mt-1 text-sm">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails