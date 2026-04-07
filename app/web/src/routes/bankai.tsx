import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bankai')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bankai"!</div>
}
