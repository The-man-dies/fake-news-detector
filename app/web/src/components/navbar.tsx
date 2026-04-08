import { BiUser } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { MdExplore, MdHomeFilled } from "react-icons/md";

export default function Navbar({ className }: { className?: string }) {
    return (
        <div className={` bg-background border-t z-50 px-4 ${className}`}>
            <NavIcom>
                <span className="">
                    <MdHomeFilled className="fill-primary " size={30} />
                </span>
                <p className=" text-primary">Accueil</p>
            </NavIcom>
            <NavIcom>
                <span className="">
                    <MdExplore size={30} className="fill-gray-600" />
                </span>
                <p className="text-secondary/80">Explorer</p>
            </NavIcom>
            <NavIcom>
                <span className="">
                    <FiAlertTriangle size={30} className="fill-gray-600" />
                </span>
                <p className="text-secondary/80">Alert</p>
            </NavIcom>
            <NavIcom className="lg:hidden">
                <span>
                    <BiUser size={30} className="fill-gray-600" />
                </span>
                <p className="text-secondary/80">Profil</p>
            </NavIcom>
            <NavIcom className="hidden lg:visible">
                <span>
                    <HiChatBubbleLeft size={30} className="fill-gray-600 " />
                </span>
                <p className="text-secondary/80">Chat</p>
            </NavIcom>
        </div>
    );
}
function NavIcom({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`flex flex-col  justify-center  [&>span]:mx-auto [&>span]:mt-1 lg:flex-row lg:justify-start lg:[&>*]:mt-auto  lg:[&>span]:w-15   lg:[&>p]:text-justify  lg:[&>p]:w-15  ${className}`}>
            {children}
        </div>
    );
}
