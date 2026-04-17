import { useQuery } from "@tanstack/react-query";
import type { UserInterface } from "./iconeRecentUser";
import IsconeRecentUser from "./iconeRecentUser";

interface UserType {
    users: UserInterface[];
}

const getUser = async () => {
    const response = await fetch("/userPP.json");
    if (!response.ok) throw new Error("Failed to load users");
    return response.json();
};

export default function RecentPage() {
    const { data, isLoading } = useQuery<UserType>({ 
        queryKey: ["users"], 
        queryFn: getUser 
    });

    if (isLoading) return <div className="h-20 flex items-center justify-center text-muted-foreground animate-pulse">Chargement...</div>;

    return (
        <div className="w-full">
            <div className="overflow-x-auto flex w-full space-x-6 no-scroll-bar pb-2">
                {data?.users.map(user => (
                    <IsconeRecentUser key={user.id} pp={user.pp} nom={user.nom} />
                ))}
            </div>
        </div>
    );
}
