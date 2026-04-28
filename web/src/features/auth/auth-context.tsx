import { createContext, useContext } from 'react'

type AuthState = {
  isAdmin: boolean
}

const AuthContext = createContext<AuthState>({
  isAdmin: false,
})

export function AuthProvider({
  value,
  children,
}: {
  value: AuthState
  children: React.ReactNode
}) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthState() {
  return useContext(AuthContext)
}
