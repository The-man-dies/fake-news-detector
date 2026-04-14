import { Link, useLocation } from "@tanstack/react-router";
import { BiUser } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { MdExplore, MdHomeFilled } from "react-icons/md";

export default function Navbar({ className }: { className?: string }) {
    return (
        <div className={` bg-background border-t z-50 px-4 ${className}`}>
            <NavIcom link="">
                <span>
                    <MdHomeFilled size={30} />
                </span>
                <p>Accueil</p>
            </NavIcom>
            <NavIcom link="explorer">
                <span className="">
                    <MdExplore size={30} />
                </span>
                <p className="text-secondary/80">Explorer</p>
            </NavIcom>
            <NavIcom link="alert">
                <span className="">
                    <FiAlertCircle size={30} />
                </span>
                <p>Alert</p>
            </NavIcom>
            <NavIcom link="profile" className="lg:hidden">
                <span>
                    <BiUser size={30} />
                </span>
                <p>Profil</p>
            </NavIcom>
            <NavIcom link="chat" className="hidden lg:flex">
                <span>
                    <HiChatBubbleLeft size={30} />
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
