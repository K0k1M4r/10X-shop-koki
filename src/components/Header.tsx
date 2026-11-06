import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { useTheme } from '../hooks/useTheme'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold text-white underline'
    : 'text-blue-100 hover:text-white'

function Header() {
  const { user, logout } = useAuth()
  const { totalQuantity } = useCart()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-blue-600">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 p-4">
        <NavLink to="/" className="text-xl font-bold text-white">
          10X Shop
        </NavLink>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <NavLink to="/" end className={linkClass}>
            Catalog
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart
            {totalQuantity > 0 && (
              <span className="ml-1 rounded-full bg-white px-2 text-sm font-semibold text-blue-600">
                {totalQuantity}
              </span>
            )}
          </NavLink>
          <button
            onClick={toggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
            className="text-blue-100 hover:text-white"
          >
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
          {user ? (
            <>
              <span className="text-white">Hi, {user}</span>
              <button
                onClick={handleLogout}
                className="text-blue-100 hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Log in
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header