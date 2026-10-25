import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../api/products'
import QuantityPicker from '../components/QuantityPicker'
import type { Product } from '../types'


function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useContext(CartContext)

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

  const mainImage = product.images[selectedImage] ?? product.thumbnail
  const outOfStock = product.stock === 0



  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <div>
      <Link to="/" className="text-blue-600 underline">
        ← Back to catalog
      </Link>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          <img
            src={mainImage}
            alt={product.title}
            className="w-full rounded-lg bg-gray-100 object-contain"
          />
          {product.images.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`h-16 w-16 overflow-hidden rounded border-2 bg-gray-100 ${
                    index === selectedImage
                      ? 'border-blue-600'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <p className="mt-4">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-blue-600">
            ${product.price}
          </p>
          <p className="mt-1 text-sm">
            {outOfStock ? 'Out of stock' : `${product.stock} in stock`}
          </p>

          <div className="mt-4">
              <QuantityPicker
                value={quantity}
                max={product.stock}
                onChange={setQuantity}
                disabled={outOfStock}
              />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className="mt-4 w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {outOfStock ? 'Out of stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails