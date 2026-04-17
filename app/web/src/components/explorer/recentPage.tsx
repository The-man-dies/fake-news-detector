import { useQuery } from "@tanstack/react-query";
import type { UserInterface } from "./iconeRecentUser";
import IsconeRecentUser from "./iconeRecentUser";
interface UserType extends UserInterface {
    users: UserInterface[];
}
const getUser = async () => {
    const query = fetch("/userPP.json");
    const data = await (await query).json();
    return data;
};
export default function RecentPage() {
    const { data } = useQuery<UserType>({ queryKey: ["users"], queryFn: getUser });
    console.log(data);
    return (
        <div className="w-full">
            <span className="text-primary ">@ recent</span>
            <div className="overflow-x-scroll mt-4 flex w-full h-auto space-x-2">
                {data?.users.map(items => (
                    <IsconeRecentUser key={items.id} pp={items.pp} nom={items.nom} />
                ))}
            </div>
        </div>
    );
}
