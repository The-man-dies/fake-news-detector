import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/alert')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/alert"!</div>
}
