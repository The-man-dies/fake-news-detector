import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, Bell, User, MessageCircle, ShieldPlus } from "lucide-react";

export default function Navbar({ className }: { className?: string }) {
    const location = useLocation();

    return (
        <div className={`bg-background border-border z-50 ${className}`}>
            <div className="hidden lg:flex items-center gap-3 p-6 border-b border-border">
                <div className="w-10 h-10 bg-primary rounded-(--radius) flex items-center justify-center text-primary-foreground shadow-md">
                    <ShieldPlus size={24} />
                </div>
                <h1 className="font-extrabold text-xl tracking-tight text-foreground">FND App</h1>
            </div>

            <nav className="flex flex-row lg:flex-col justify-around lg:justify-start w-full h-full lg:p-4 gap-1 lg:gap-2">
                <NavItem link="" label="Accueil" icon={<Home size={24} />} isActive={location.pathname === "/"} />
                <NavItem
                    link="explorer"
                    label="Explorer"
                    icon={<Compass size={24} />}
                    isActive={location.pathname === "/explorer"}
                />

                <NavItem
                    link="alert"
                    label="Alertes"
                    icon={<Bell size={24} />}
                    isActive={location.pathname === "/alert"}
                />
                <NavItem
                    link="chat"
                    label="Discussions"
                    icon={<MessageCircle size={24} />}
                    isActive={location.pathname === "/chat"}
                    className="hidden lg:flex"
                />
                <NavItem
                    link="profile"
                    label="Profil"
                    icon={<User size={24} />}
                    isActive={location.pathname === "/profile"}
                />
            </nav>
        </div>
    );
}

function NavItem({
    icon,
    label,
    link,
    isActive,
    className,
}: {
    icon: React.ReactNode;
    label: string;
    link: string;
    isActive: boolean;
    className?: string;
}) {
    return (
        <Link
            to={`/${link}`}
            className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-4 p-2 lg:px-4 lg:py-3.5 rounded-(--radius) transition-all w-full group ${
                isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            } ${className}`}>
            <div
                className={`transition-transform group-active:scale-90 ${isActive ? "text-primary scale-110 lg:scale-100" : ""}`}>
                {icon}
            </div>
            <span
                className={`text-[10px] lg:text-[15px] font-bold lg:font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {label}
            </span>
        </Link>
    );
}
