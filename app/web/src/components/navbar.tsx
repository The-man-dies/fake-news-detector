import { BiUser } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { MdExplore, MdHomeFilled } from "react-icons/md";

export default function Navbar({ className }: { className?: string }) {
    return (
        <div className={` bg-background border-t z-50 px-4 ${className}`}>
            <NavIcom>
                <span>
                    <MdHomeFilled className="fill-primary " size={30} />
                </span>
                <p className="text-primary">Accueil</p>
            </NavIcom>
            <NavIcom>
                <span>
                    <MdExplore size={30} className="fill-gray-600" />
                </span>
                <p className="text-secondary/80">Explorer</p>
            </NavIcom>
            <NavIcom>
                <span>
                    <FiAlertTriangle size={30} className="fill-gray-600" />
                </span>
                <p className="text-secondary/80">Alert</p>
            </NavIcom>
            <NavIcom>
                <span>
                    <BiUser size={30} className="fill-gray-600" />
                </span>
                <p className="text-secondary/80">Profil</p>
            </NavIcom>
        </div>
    );
}
function NavIcom({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col  justify-center  [&>span]:mx-auto [&>span]:mt-1 lg:flex-row lg:[&>*]:mt-auto lg:gap-2 bgy">
            {children}
        </div>
    );
}
