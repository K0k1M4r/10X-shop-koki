import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../api/products'
import QuantityPicker from '../components/QuantityPicker'
import { CartContext } from '../context/CartContext'
import { useFetch } from '../hooks/useFetch'
import { isApiError } from '../utils/guards'
import { discountedPrice, formatPrice } from '../utils/price'
import { getStockStatus, STOCK_CLASSES, stockLabel } from '../utils/stock'
import NotFound from './NotFound'

function ProductDetails() {
  const { id } = useParams()

  if (!id || !/^\d+$/.test(id)) return <NotFound />

  return <ProductView key={id} id={id} />
}

function ProductView({ id }: { id: string }) {
  const { items, addItem } = useContext(CartContext)
  const { state, error } = useFetch(fetchProduct, id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (state.status === 'error' && isApiError(error) && error.status === 404) {
    return <NotFound />
  }

  if (state.status === 'idle' || state.status === 'loading') {
    return <p>Loading product...</p>
  }

  if (state.status === 'error') {
    return (
      <div>
        <p className="text-red-600">{state.message}</p>
        <Link to="/" className="text-blue-600 underline">
          ← Back to catalog
        </Link>
      </div>
    )
  }

  const product = state.data
  const mainImage = product.images[selectedImage] ?? product.thumbnail
  const outOfStock = getStockStatus(product) === 'out-of-stock'
  const inCart = items.find((item) => item.id === product.id)?.quantity ?? 0
  const available = product.stock - inCart
  const soldOut = outOfStock || available <= 0
  const qty = Math.min(quantity, Math.max(available, 1))

  const percent = Math.round(product.discountPercentage)
  const hasDiscount = percent >= 1
  const finalPrice = discountedPrice(product.price, product.discountPercentage)

  const handleAddToCart = () => {
    addItem(product, qty)
    setQuantity(1)
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

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold text-blue-600">
              {formatPrice(finalPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded bg-red-600 px-2 text-sm font-semibold text-white">
                  −{percent}%
                </span>
              </>
            )}
          </div>

          <p
            className={`mt-1 text-sm font-medium ${STOCK_CLASSES[getStockStatus(product)]}`}
          >
            {stockLabel(product)}
          </p>

          <div className="mt-4">
            <QuantityPicker
              value={qty}
              max={Math.max(available, 1)}
              onChange={setQuantity}
              disabled={soldOut}
            />
          </div>

          {inCart > 0 && available > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              You have {inCart} in your cart. You can add up to {available} more.
            </p>
          )}
          {!outOfStock && available <= 0 && (
            <p className="mt-2 text-sm text-red-600">
              You already have all {product.stock} available items in your cart.
            </p>
          )}

          <button
            onClick={handleAddToCart}
            disabled={soldOut}
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