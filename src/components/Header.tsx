import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold text-white underline'
    : 'text-blue-100 hover:text-white'

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { totalQuantity } = useContext(CartContext)
  return (
    <header className="bg-blue-600">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 p-4">
        <NavLink to="/" className="text-xl font-bold text-white">
          10X Shop
        </NavLink>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <NavLink to="/" end className={linkClass}>Catalog</NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart    
            {totalQuantity > 0 && (
              <span className="ml-1 rounded-full bg-white px-2 text-sm font-semibold text-blue-600">
                {totalQuantity}
              </span>
            )}
          </NavLink>
          {user ? (
            <>
              <span className="text-white">Hi, {user}</span>
              <button onClick={logout} className="text-blue-100 hover:text-white">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>Login</NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header