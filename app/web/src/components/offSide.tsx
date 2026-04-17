import { Search, TrendingUp, Bookmark } from "lucide-react";

export default function OffSide({ className }: { className?: string }) {
    return (
        <div className={`flex flex-col gap-8 h-full bg-background text-foreground ${className}`}>
            <div className="relative group">
                <Search
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Vérifier une source..."
                    className="w-full pl-12 pr-5 py-4 bg-background border border-border rounded-(--radius) focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-sm font-bold placeholder:text-muted-foreground/50 shadow-sm"
                />
            </div>

            <div className="bg-card/50 text-card-foreground border border-border rounded-(--radius) p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-black tracking-tight">Activité 24h</h2>
                    <TrendingUp size={18} className="text-primary" />
                </div>
                <div className="space-y-4">
                    <StatItem label="Articles vérifiés" value="482" color="bg-green-500" />
                    <StatItem label="Fake news détectées" value="24" color="bg-destructive" />
                    <StatItem label="Sources analysées" value="1.2k" color="bg-primary" />
                </div>
            </div>

            <div className="bg-card/50 text-card-foreground border border-border rounded-(--radius) overflow-hidden shadow-sm">
                <div className="p-6 bg-muted/20 border-b border-border">
                    <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                        <Bookmark size={18} className="text-primary fill-primary/10" />
                        Sources vraies
                    </h2>
                </div>
                <div className="divide-y divide-border">
                    <SourceItem name="AFP Fact Check" index="98" />
                    <SourceItem name="FactCheck.org" index="94" />
                    <SourceItem name="Le Monde" index="96" />
                </div>
                <button className="w-full py-5 text-sm font-black text-primary hover:bg-primary/5 transition-colors uppercase tracking-widest">
                    Annuaire complet
                </button>
            </div>

            <div className="px-6 space-y-3">
                <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">
                    <a href="#" className="hover:text-primary">
                        Docs
                    </a>
                    <a href="#" className="hover:text-primary">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-primary">
                        Methodology
                    </a>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium opacity-40">
                    © 2026 Fake News Detector Project by the men die
                </p>
            </div>
        </div>
    );
}

function StatItem({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div className="flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3">
                <div className={`w-1.5 h-6 rounded-full ${color}`}></div>
                <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                    {label}
                </span>
            </div>
            <span className="text-lg font-black">{value}</span>
        </div>
    );
}

function SourceItem({ name, index }: { name: string; index: string }) {
    return (
        <div className="px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer flex items-center justify-between group">
            <span className="font-bold text-[14px] group-hover:text-primary transition-colors">{name}</span>
            <div className="px-2.5 py-1 bg-green-500/10 rounded-full">
                <span className="text-xs font-black text-green-500">{index}%</span>
            </div>
        </div>
    );
}
