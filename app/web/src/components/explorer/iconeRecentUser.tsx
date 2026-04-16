export interface UserInterface {
    id?: number;
    nom?: string;
    pp: string;
}

export default function IsconeRecentUser({ id, nom, pp }: UserInterface) {
    return (
        <div className="h-[59px] w-[59px] rounded-full overflow-hidden">
            <img src={`${pp}`} alt={`${nom}`} />
        </div>
    );
}
