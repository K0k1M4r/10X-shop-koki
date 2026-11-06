import { useContext, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

interface RegisterFormValues {
  username: string
  password: string
  confirm: string
}

function getFrom(state: unknown): string {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof state.from === 'string'
  ) {
    return state.from
  }
  return '/'
}

function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = getFrom(location.state)

  const [values, setValues] = useState<RegisterFormValues>({
    username: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState<Partial<RegisterFormValues>>({})

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const username = values.username.trim()
    const newErrors: Partial<RegisterFormValues> = {}

    if (!username) newErrors.username = 'Username is required'

    if (!values.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (values.confirm !== values.password) {
      newErrors.confirm = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const error = register(username, values.password)
    if (error) {
      setErrors({ username: error })
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="mx-auto max-w-sm">
      <Link to="/" className="text-blue-600 underline">
        ← Back to catalog
      </Link>
      <h1 className="mb-4 mt-4 text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm font-medium">
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            value={values.confirm}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.confirm && (
            <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link to="/login" state={{ from }} className="text-blue-600 underline">
          Log in
        </Link>
      </p>
    </div>
  )
}

export default Register