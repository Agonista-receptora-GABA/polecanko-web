import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/discover')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/discover"!</div>
}
