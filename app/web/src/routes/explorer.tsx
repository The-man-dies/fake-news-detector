import { createFileRoute } from "@tanstack/react-router";
import Explorer from "../components/explorer/explorer";

export const Route = createFileRoute("/explorer")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="overflow-hidden space-y-4 md:px-4">
            <Explorer />
            <main className="overflow-y-scroll h-screen no-scroll-bar"></main>
        </div>
    );
}
