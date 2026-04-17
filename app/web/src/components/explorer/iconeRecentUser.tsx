export interface UserInterface {
    id?: number;
    nom?: string;
    pp: string;
}

export default function IsconeRecentUser({ nom, pp }: UserInterface) {
    return (
        <div className=" w-[65px] rounded-full overflow-hidden border-4 border-border">
            <img src={`${pp}`} alt={`${nom}`} />
        </div>
    );
}
