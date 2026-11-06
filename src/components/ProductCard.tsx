import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useToast } from '../hooks/useToast'
import type { Product } from '../types'
import { discountedPrice, formatPrice } from '../utils/price'
import { getStockStatus, stockLabel } from '../utils/stock'
import type { StockStatus } from '../utils/stock'

const STOCK_BADGE: Record<StockStatus, string> = {
  'in-stock': 'bg-green-100 text-green-800',
  'low-stock': 'bg-amber-100 text-amber-800',
  'out-of-stock': 'bg-red-100 text-red-800',
}

function ProductCard({ product }: { product: Product }) {
  const { items, addItem } = useCart()
  const { showToast } = useToast()

  const outOfStock = getStockStatus(product) === 'out-of-stock'
  const inCart = items.find((item) => item.id === product.id)?.quantity ?? 0
  const percent = Math.round(product.discountPercentage)
  const hasDiscount = percent >= 1
  const finalPrice = discountedPrice(product.price, product.discountPercentage)

  function handleAdd() {
    if (inCart >= product.stock) {
      showToast('All available stock is already in your cart')
      return
    }
    addItem(product, 1)
    showToast('Added to cart ✓')
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="block flex-1">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width={300}
          height={192}
          className="h-48 w-full bg-gray-100 object-contain"
        />
        <div className="p-3">
          <h2 className="font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-500">
            {product.category}
            {product.brand ? ` · ${product.brand}` : ''}
          </p>
          <p className="text-sm">★ {product.rating.toFixed(1)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="font-semibold text-blue-600">
              {formatPrice(finalPrice)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded bg-red-600 px-1.5 text-xs font-semibold text-white">
                  −{percent}%
                </span>
              </>
            )}
          </div>
          <span
            className={`mt-2 inline-block rounded px-2 py-0.5 text-xs font-medium ${STOCK_BADGE[getStockStatus(product)]}`}
          >
            {stockLabel(product)}
          </span>
        </div>
      </Link>
      <button
        onClick={handleAdd}
        disabled={outOfStock}
        className="m-3 mt-0 rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {outOfStock ? 'Out of stock' : 'Add to cart'}
      </button>
    </div>
  )
}

export default memo(ProductCard)