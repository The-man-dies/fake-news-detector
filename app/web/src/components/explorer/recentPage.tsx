import { useQuery } from "@tanstack/react-query";
import IsconeRecentUser from "./iconeRecentUser";
import type { UserInterface } from "./iconeRecentUser";
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
        <div className="">
            <span className="text-primary mb-2">@ recent</span>
            <div className="w-full overflow-x-scroll no-scroll-bar flex flex-row gap-2.5">
                {/* {data?.users.map(items => (
                    <IsconeRecentUser key={items.id} pp={items.pp} nom={items.nom} />
                ))} */}
            </div>
        </div>
    );
}
