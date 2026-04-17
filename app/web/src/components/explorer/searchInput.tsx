import { Search } from "lucide-react";

export default function SearchInput() {
    return (
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
    );
}
