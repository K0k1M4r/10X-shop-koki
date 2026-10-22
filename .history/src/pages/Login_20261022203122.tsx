import { useContext, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import type { LoginFormValues } from '../types'

function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [values, setValues] = useState<LoginFormValues>({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({})

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const newErrors: Partial<LoginFormValues> = {}
    if (!values.username.trim()) newErrors.username = 'Username is required'
    if (!values.password.trim()) newErrors.password = 'Password is required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    login(values.username)
    navigate(from, { replace: true })
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 p-2"
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
            className="mt-1 w-full rounded border border-gray-300 p-2"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700"
        >
          Log in
        </button>
      </form>
    </div>
  )
}

export default Login