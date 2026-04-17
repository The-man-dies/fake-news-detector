import SearchInput from "./searchInput";
import RecentPage from "./recentPage";
import { Search, History } from "lucide-react";

export default function Explorer() {
    return (
        <div className="flex flex-col h-full bg-background text-foreground">
            <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md px-6 py-10 border-b border-border text-center">
                <div className="max-w-[500px] mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                        <Search size={14} />
                        Recherche
                    </div>
                    <h1 className="text-2xl font-black tracking-tighter">Trouvez une analyse ou un utilisateur</h1>
                    <SearchInput />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto no-scroll-bar px-6 py-10">
                <div className="max-w-[600px] mx-auto space-y-12">
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-muted rounded-(--radius) text-muted-foreground">
                                <History size={20} />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Utilisateurs récents</h2>
                        </div>
                        <div className="bg-muted/20 border border-border p-6 rounded-(--radius)">
                            <RecentPage />
                        </div>
                    </section>
                </div>

                <div className="h-24 lg:hidden" />
            </main>
        </div>
    );
}
