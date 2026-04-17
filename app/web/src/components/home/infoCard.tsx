import { ShieldCheck, ShieldAlert, ShieldQuestion, Info, Share2, ExternalLink } from "lucide-react";

type NewsItem = {
    id: number;
    title: string;
    time: string;
    reliability: number;
    status: string;
    description: string;
    image: string;
    authorAvatar: string;
};

export default function InfoCard({ id, title, description, image, reliability, status, time }: NewsItem) {
    const getReliabilityColor = () => {
        if (reliability > 70) return "bg-green-500";
        if (reliability > 40) return "bg-yellow-500";
        return "bg-destructive";
    };

    const getStatusVariant = () => {
        if (reliability > 70) return "text-green-500 bg-green-500/10 border-green-500/20";
        if (reliability > 40) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
        return "text-destructive bg-destructive/10 border-destructive/20";
    };

    return (
        <article
            key={id}
            className="w-full bg-card/50 text-card-foreground border border-border rounded-(--radius) overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col mb-8">
            {image && (
                <div className="relative w-full h-[220px] lg:h-[320px] bg-muted overflow-hidden">
                    <img src={image} alt={title} className="w-full h-full object-cover" />

                    <div
                        className={`absolute bottom-4 left-4 flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md font-bold text-sm ${getStatusVariant()}`}>
                        {reliability > 70 ? (
                            <ShieldCheck size={16} />
                        ) : reliability > 40 ? (
                            <ShieldQuestion size={16} />
                        ) : (
                            <ShieldAlert size={16} />
                        )}
                        <span>{status}</span>
                    </div>
                </div>
            )}

            <div className="p-5 lg:p-7 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg lg:text-xl font-extrabold leading-tight flex-1 mr-4">{title}</h2>
                    <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">{time}</span>
                </div>

                <p className="text-[15px] text-muted-foreground leading-relaxed line-clamp-2">{description}</p>

                <div className="mt-2 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Info size={14} />
                            Analyse de fiabilité
                        </span>
                        <span className="text-foreground">{reliability}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${getReliabilityColor()}`}
                            style={{ width: `${reliability}%` }}></div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                            <ExternalLink size={16} />
                            Source
                        </button>
                        <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                            <Share2 size={16} />
                            Partager
                        </button>
                    </div>
                    <button className="px-5 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 text-xs font-bold rounded-full transition-colors">
                        Détails de l'analyse
                    </button>
                </div>
            </div>
        </article>
    );
}
