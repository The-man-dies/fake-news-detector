import SearchInput from "./searchInput";
import RecentPage from "./recentPage";

export default function Explorer() {
    return (
        <div>
            <header className="space-y-1  h-[60px] ">
                <h1 className="">Fakes news detector </h1>
                <SearchInput />
            </header>
            <RecentPage />
            <main className="overflow-y-scroll h-screen no-scroll-bar w-full"></main>
        </div>
    );
}
