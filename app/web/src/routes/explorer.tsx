import { createFileRoute } from "@tanstack/react-router";
import Explorer from "../components/explorer/explorer";

export const Route = createFileRoute("/explorer")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <Explorer />
        </div>
    );
}
