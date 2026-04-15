import { Link, useLocation } from "@tanstack/react-router";
import { AlertTriangle, HomeIcon, Map, MessageSquareIcon, UserCircle } from "lucide-react";

export default function Navbar({ className }: { className?: string }) {
    return (
        <div className={` bg-background border-t z-50 px-4 ${className}`}>
            <NavIcom link="">
                <span>
                    <HomeIcon size={30} />
                </span>
                <p>Accueil</p>
            </NavIcom>
            <NavIcom link="explorer">
                <span className="">
                    <Map size={30} />
                </span>
                <p className="text-secondary/80">Explorer</p>
            </NavIcom>
            <NavIcom link="alert">
                <span className="">
                    <AlertTriangle size={30} />
                </span>
                <p>Alert</p>
            </NavIcom>
            <NavIcom link="profile" className="lg:hidden">
                <span>
                    <UserCircle size={30} />
                </span>
                <p>Profil</p>
            </NavIcom>
            <NavIcom link="chat" className="hidden lg:flex">
                <span>
                    <MessageSquareIcon size={30} />
                </span>
                <p>Chat</p>
            </NavIcom>
        </div>
    );
}
function NavIcom({ children, className, link }: { children: React.ReactNode; className?: string; link: string }) {
    const location = useLocation();

    return (
        <Link
            className={`flex flex-col  justify-center  ${location.pathname === `/${link}` ? "[&>p]:text-primary [&>span]:text-primary" : " [&>p]:text-gray-600 [&>span]:text-gray-600"}   [&>span]:mx-auto [&>span]:mt-1 lg:flex-row lg:justify-start lg:[&>*]:mt-auto  lg:[&>span]:w-15   lg:[&>p]:text-justify lg:[&>p]:w-15  ${className} `}
            to={`/${link}`}>
            {children}
        </Link>
    );
}
