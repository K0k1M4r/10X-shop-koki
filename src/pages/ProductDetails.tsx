import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../api/products'
import QuantityPicker from '../components/QuantityPicker'
import ReviewForm from '../components/ReviewForm'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { useFetch } from '../hooks/useFetch'
import { useToast } from '../hooks/useToast'
import type { Product } from '../types'
import type { Review } from '../types/review'
import { isApiError } from '../utils/guards'
import { discountedPrice, formatPrice } from '../utils/price'
import { addLocalReview, getApiReviews, getLocalReviews } from '../utils/reviews'
import { getStockStatus, STOCK_CLASSES, stockLabel } from '../utils/stock'
import NotFound from './NotFound'

type Tab = 'description' | 'details' | 'reviews'

const TABS: Tab[] = ['description', 'details', 'reviews']

function tabLabel(tab: Tab, reviewCount: number): string {
  if (tab === 'description') return 'Description'
  if (tab === 'details') return 'Details'
  return `Reviews (${reviewCount})`
}

function stars(rating: number): string {
  const filled = Math.max(0, Math.min(5, Math.round(rating)))
  return '★'.repeat(filled) + '☆'.repeat(5 - filled)
}

function ProductDetails() {
  const { id } = useParams()

  if (!id || !/^\d+$/.test(id)) return <NotFound />

  return <ProductView key={id} id={id} />
}

function ProductView({ id }: { id: string }) {
  const { state, error } = useFetch(fetchProduct, id)

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

  return <ProductContent product={state.data} />
}

function ProductContent({ product }: { product: Product }) {
  const { items, addItem } = useCart()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState<Tab>('description')
  const [localReviews, setLocalReviews] = useState<Review[]>(() =>
    getLocalReviews(product.id),
  )

  const apiReviews = useMemo(() => getApiReviews(product), [product])
  const reviews = useMemo(
    () => [...localReviews, ...apiReviews],
    [localReviews, apiReviews],
  )
  const averageRating = useMemo(
    () =>
      reviews.length === 0
        ? product.rating
        : reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    [reviews, product.rating],
  )

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
    showToast('Added to cart ✓')
    setQuantity(1)
  }

  const handleAddReview = (rating: number, comment: string) => {
    const review: Review = {
      rating,
      comment,
      date: new Date().toISOString(),
      reviewerName: user ?? 'Guest',
    }
    addLocalReview(product.id, review)
    setLocalReviews((current) => [review, ...current])
    showToast('Review added ✓')
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
          <p className="mt-1 text-sm">
            ★ {averageRating.toFixed(1)} · {reviews.length}{' '}
            {reviews.length === 1 ? 'review' : 'reviews'}
          </p>

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

          <div className="mt-6 border-t pt-4">
            <div role="tablist" className="flex flex-wrap gap-2">
              {TABS.map((item) => (
                <button
                  key={item}
                  role="tab"
                  aria-selected={tab === item}
                  onClick={() => setTab(item)}
                  className={`rounded px-3 py-1 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-300 ${
                    tab === item
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tabLabel(item, reviews.length)}
                </button>
              ))}
            </div>
            <div role="tabpanel" className="mt-3 text-sm">
              {tab === 'description' && <p>{product.description}</p>}

              {tab === 'details' && (
                <dl className="grid max-w-xs grid-cols-2 gap-x-4 gap-y-1">
                  <dt className="text-gray-500">Category</dt>
                  <dd>{product.category}</dd>
                  <dt className="text-gray-500">Brand</dt>
                  <dd>{product.brand ?? '—'}</dd>
                  <dt className="text-gray-500">Rating</dt>
                  <dd>★ {product.rating.toFixed(1)}</dd>
                  <dt className="text-gray-500">Stock</dt>
                  <dd>{product.stock}</dd>
                  <dt className="text-gray-500">Discount</dt>
                  <dd>{percent}%</dd>
                </dl>
              )}

              {tab === 'reviews' && (
                <div>
                  {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {reviews.map((review, index) => (
                        <li
                          key={`${review.date}-${index}`}
                          className="rounded border border-gray-200 p-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-medium">
                              {review.reviewerName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p
                            className="text-amber-500"
                            aria-label={`${review.rating} out of 5`}
                          >
                            {stars(review.rating)}
                          </p>
                          <p className="mt-1">{review.comment}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  <ReviewForm onSubmit={handleAddReview} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails