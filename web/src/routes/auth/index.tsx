import { AuthSignIn } from "#/features/auth/sign-in"
import { createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/auth/")({
  component: AuthPage
})

function AuthPage() {

  return (
   <AuthSignIn/>
  )
}