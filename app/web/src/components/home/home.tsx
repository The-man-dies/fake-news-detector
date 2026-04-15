import { HiChatBubbleLeft } from "react-icons/hi2";
import InfoCard from "./infoCard";
import { useQuery } from "@tanstack/react-query";

interface InfoItem {
    id: number;
    title: string;
    time: string;
    reliability: number;
    status: string;
    description: string;
    image: string;
    authorAvatar: string;
}

interface InfoResponse {
    news: InfoItem[];
}

const queryInfo = async (): Promise<InfoResponse> => {
    const result = await fetch("/info.json");

    if (!result.ok) {
        throw new Error("Erreur de fetch");
    }

    return result.json();
};

export default function Home() {
    const { data, isLoading, isError, error } = useQuery<InfoResponse>({
        queryKey: ["info"],
        queryFn: queryInfo,
    });

    if (isError) {
        return (
            <div className="w-full p-4">
                <p>{(error as Error).message}</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* header */}
            <div className="flex flex-row justify-between">
                <h1 className="font-bold text-[20px]">Fake news detector</h1>

                <HiChatBubbleLeft size={25} className="fill-gray-600 lg:hidden" />
            </div>

            {/* navbar */}
            <div className="flex flex-row justify-between [&>p]:text-[16px] [&>p]:font-bold">
                <p className="underline text-primary underline-offset-3">pour toi</p>
                <p>abonnement</p>
                <p>communaute</p>
            </div>

            {/* cards */}
            <div className=" overflow-y-scroll h-screen w-full no-scroll-bar space-y-4  lg:space-y-10">
                {isLoading ? (
                    <InfoCard
                        key={""}
                        id={0}
                        authorAvatar={""}
                        title={""}
                        description={""}
                        image={""}
                        reliability={0}
                        status={""}
                        time={""}
                    />
                ) : (
                    data?.news.map(item => (
                        <InfoCard
                            key={item.id}
                            id={item.id}
                            authorAvatar={item.authorAvatar}
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            reliability={item.reliability}
                            status={item.status}
                            time={item.time}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
