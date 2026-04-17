import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/navbar";
import OffSide from "../components/offSide";

export const Route = createRootRoute({
    component: () => (
        <div className="min-h-screen w-full bg-background text-foreground flex justify-center">
            <div className="flex flex-col lg:flex-row w-full max-w-[1250px] relative">
                <Navbar className="hidden lg:flex lg:flex-col lg:w-[280px] lg:sticky lg:top-0 lg:h-screen lg:border-r border-border" />

                <main className="flex-1 min-h-screen relative pb-[70px] lg:pb-0 lg:max-w-[full] border-r border-border bg-background">
                    <Outlet />
                </main>

                <OffSide className="hidden xl:flex xl:w-[320px] sticky top-0 h-screen p-6" />

                <Navbar className="lg:hidden fixed bottom-0 left-0 w-full h-[65px] border-t bg-background/95 backdrop-blur-sm z-50" />
            </div>

            <TanStackRouterDevtools />
        </div>
    ),
});
