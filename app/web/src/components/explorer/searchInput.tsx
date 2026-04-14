import { BiSearch } from "react-icons/bi";

export default function SearchInput() {
    return (
        <label className="border border-border flex flex-row gap-2.5 rounded-md px-3 bg-muted">
            <BiSearch className="mt-1 fill-gray-600" size={20} />
            <input
                type="text"
                placeholder="hrl"
                className="focus:border-none focus:outline-none w-full text-muted-foreground"
            />
        </label>
    );
}
