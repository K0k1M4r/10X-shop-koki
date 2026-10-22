import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'font-semibold text-white underline'
    : 'text-blue-100 hover:text-white'

function Header() {
  return (
    <header className="bg-blue-600">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <NavLink to="/" className="text-xl font-bold text-white">
          10X Shop
        </NavLink>
        <div className="flex gap-4">
          <NavLink to="/" end className={linkClass}>Catalog</NavLink>
          <NavLink to="/cart" className={linkClass}>Cart</NavLink>
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header