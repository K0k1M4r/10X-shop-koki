import Layout from './components/Layout'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProductDetails from './pages/ProductDetails'
import { Route, Routes, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const location = useLocation()

  return (
    <Layout>
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  )
}

export default App