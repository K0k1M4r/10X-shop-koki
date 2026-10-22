import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold text-white underline'
    : 'text-blue-100 hover:text-white'

function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className="bg-blue-600">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <NavLink to="/" className="text-xl font-bold text-white">
          10X Shop
        </NavLink>
        <div className="flex items-center gap-4">
          <NavLink to="/" end className={linkClass}>Catalog</NavLink>
          <NavLink to="/cart" className={linkClass}>Cart</NavLink>
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