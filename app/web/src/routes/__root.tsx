import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/navbar";
import OffSide from "../components/offSide";

export const Route = createRootRoute({
    component: () => (
        <div className="min-h-screen w-full bg-background">
            <div className="mx-auto min-w-[340px] w-[95%] lg:flex lg:flex-row lg:w-[1000px]  bg-background pb-[60px] shadow-lg xl:w-[1250px] ">
                <Navbar className=" fixed bottom-0 left-0 w-full h-[52px] flex justify-between items-center lg:relative lg:h-screen lg:flex lg:flex-col lg:justify-start lg:gap-3   lg:w-1/5 " />
                <main className="flex-1 h-screen lg:border-x-2 lg:border-border">
                    <Outlet />
                </main>
                <OffSide className="invisible lg:visible lg:w-1/5" />
                <TanStackRouterDevtools />
            </div>
        </div>
    ),
});
