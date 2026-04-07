import { HiChatBubbleLeft } from "react-icons/hi2";
import InfoCard from "./infoCard";

export default function Home() {
    return (
        <div className=" ">
            {/* header */}

            <div className="flex flex-row justify-between ">
                <h1 className="font-bold text-[20px]">Fake news detector</h1>
                <HiChatBubbleLeft size={25} className="fill-gray-600" />
            </div>
            {/* navbar */}
            <div className="flex flex-row justify-between [&>p]:text-[16px] [&>p]:font-bold ">
                <p className="underline text-primary underline-offset-3">pour toi</p>
                <p>abonnement</p>
                <p>communaute</p>
            </div>

            <div className="h-full w-[402] overflow-y-auto ">
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
            </div>
        </div>
    );
}
