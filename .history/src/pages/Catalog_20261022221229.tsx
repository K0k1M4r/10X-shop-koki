import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'
import type { Product } from '../types'

function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    fetchProducts()
      .then((data) => {
        if (!ignore) setProducts([])
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
  }, [])

  if (loading) return <p>Loading products...</p>
  if (error) return <p className="text-red-600">Something went wrong: {error}</p>
  if (products.length === 0) return <p>No products found.</p>

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Catalog</h1>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Catalog