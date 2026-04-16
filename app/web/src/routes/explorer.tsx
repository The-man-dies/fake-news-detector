import { createFileRoute } from "@tanstack/react-router";
import Explorer from "../components/explorer/explorerPage";

export const Route = createFileRoute("/explorer")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="overflow-hidden space-y-4 md:px-4">
            <Explorer />
        </div>
    );
}
