import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Checkout() {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />
  }

  return <h1 className="text-2xl font-bold">Checkout</h1>
}

export default Checkout