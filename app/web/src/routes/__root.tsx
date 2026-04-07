import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/navbar";
import OffSide from "../components/offSide";

export const Route = createRootRoute({
    component: () => (
        <div className="mx-auto min-w-[340px] w-[402px]  lg:flex lg:flex-row lg:w-full  bg-background pb-[60px] shadow-lg">
            <Navbar className=" fixed bottom-0 left-0 w-full h-[52px] flex justify-between items-center lg:relative lg:h-screen lg:flex lg:flex-col   lg:w-1/3" />
            <Outlet />
            <OffSide className="lg:w-1/3" />
            <TanStackRouterDevtools />
        </div>
    ),
});
