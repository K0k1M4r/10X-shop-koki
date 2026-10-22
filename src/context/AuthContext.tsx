import { createContext, useState } from 'react'
import type { ReactNode } from 'react'

interface AuthContextValue {
  user: string | null
  login: (username: string) => void
  logout: () => void
}
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null)

  const login = (username: string) => setUser(username)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

