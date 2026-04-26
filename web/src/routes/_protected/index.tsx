import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protected/")({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div>Dashboard</div>
  )
}