import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import NotFound from './pages/NotFound'

const Catalog = lazy(() => import('./pages/Catalog'))
const Login = lazy(() => import('./pages/Login'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App