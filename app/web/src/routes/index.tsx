import { createFileRoute } from "@tanstack/react-router";
import Home from "../components/home/home";

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <Home />;
}
