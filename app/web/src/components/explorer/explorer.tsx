import SearchInput from "./searchInput";

export default function Explorer() {
    return (
        <div>
            <header className="space-y-2 md:px-4 h-[60px] ">
                <h1 className="">Fakes news detector </h1>
                <SearchInput />
            </header>
        </div>
    );
}
