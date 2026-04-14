import { HiChatBubbleLeft } from "react-icons/hi2";
import InfoCard from "./infoCard";
import { useEffect, useState } from "react";
interface infoItem {
    id: number;
    title: string;
    time: string;
    reliability: number;
    status: string;
    description: string;
    image: string;
    authorAvatar: string;
}

export default function Home() {
    const [info, setInfo] = useState<infoItem[]>([]);

    useEffect(() => {
        const query = async () => {
            const result = await fetch("/info.json");
            if (!result.ok) throw new Error("error de fetch ");
            const data = await result.json();
            setInfo(data.news);
        };
        query();
    }, []);
    console.log(info);

    return (
        <div className="  w-full ">
            {/* header */}

            <div className="flex flex-row justify-between ">
                <h1 className="font-bold text-[20px]">Fake news detector</h1>
                <HiChatBubbleLeft size={25} className="fill-gray-600 lg:hidden" />
            </div>
            {/* navbar */}
            <div className="flex flex-row justify-between [&>p]:text-[16px] [&>p]:font-bold ">
                <p className="underline text-primary underline-offset-3">pour toi</p>
                <p>abonnement</p>
                <p>communaute</p>
            </div>

            <div className="h-screen overflow-y-scroll w-full no-scroll-bar">
                {info.map(data => (
                    <InfoCard
                        id={data.id}
                        authorAvatar={data.authorAvatar}
                        key={data.id}
                        title={data.title}
                        description={data.description}
                        image={data.image}
                        reliability={data.reliability}
                        status={data.status}
                        time={data.time}
                    />
                ))}
            </div>
        </div>
    );
}
