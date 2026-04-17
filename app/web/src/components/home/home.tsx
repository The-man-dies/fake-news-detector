import { MessageCircle } from "lucide-react";
import InfoCard from "./infoCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    if (!result.ok) throw new Error("Erreur réseau");
    return result.json();
};

export default function Home() {
    const [activeTab, setActiveTab] = useState("Tout");
    const categories = ["Tout", "Politique", "Santé", "Tech", "Science", "environnement"];

    const { data, isLoading, isError, error } = useQuery<InfoResponse>({
        queryKey: ["info"],
        queryFn: queryInfo,
    });

    return (
        <div className="flex flex-col h-full">
            <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-r border-border/60 px-5 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-black tracking-tighter">Flux d'Analyses</h1>
                    <button className="p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors lg:hidden">
                        {/* <SlidersHorizontal size={20} /> */}
                        <MessageCircle size={24} />
                    </button>
                </div>

                <div className="flex gap-2 overflow-x-auto no-scroll-bar lg:justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                                activeTab === cat
                                    ? "bg-primary text-white border-primary shadow-sm"
                                    : "bg-muted text-muted-foreground border-transparent hover:border-border"
                            }`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 no-scroll-bar">
                {isError && (
                    <div className="p-6 bg-destructive/10 text-destructive rounded-2xl border border-destructive/20 text-center font-bold">
                        {(error as Error).message}
                    </div>
                )}

                <div className="max-w-2xl mx-auto">
                    {isLoading
                        ? Array.from({ length: 2 }).map((_, i) => (
                              <div key={i} className="w-full h-80 bg-muted animate-pulse rounded-[24px] mb-8" />
                          ))
                        : data?.news.map(item => (
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
                          ))}
                </div>
            </div>
        </div>
    );
}
