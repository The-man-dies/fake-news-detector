export interface UserInterface {
    id?: number;
    nom?: string;
    pp: string;
}

export default function IsconeRecentUser({ nom, pp }: UserInterface) {
    return (
        <div className="flex flex-col items-center gap-2 group cursor-pointer shrink-0">
            <div className="w-[60px] h-[60px] lg:w-[68px] lg:h-[68px] rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-all p-0.5 bg-background">
                <img src={pp} alt={nom} className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="text-[11px] font-bold text-muted-foreground group-hover:text-primary transition-colors truncate max-w-[70px]">
                {nom}
            </span>
        </div>
    );
}
