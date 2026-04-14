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

export default function InfoCard({ id, title, authorAvatar, description, image, reliability, status, time }: NewsItem) {
    return (
        <div key={id} className="h-[417px] w-full flex flex-col">
            <div className="bg-secondary rounded-[20px] w-full h-[194px] lg:h-[350px] overflow-hidden">
                <img src={`${image}`} alt={`${image}`} className="object-center" />{" "}
            </div>
            <div className="flex flex-row justify-between">
                <h1 className="font-bold text-[16px] w-[291px]">{title}</h1>
                <p className="text-[14px] text-card-foreground/30">{time}</p>
            </div>
            <div className="flex flex-row justify-between relative">
                <div className="h-[4px] w-[70%] bg-card-foreground flex justify-between overflow-hidden">
                    <div className={`h-full w-[${reliability}%] bg-primary`}></div>
                </div>
                <h1 className="text-primary text-[10px] relative -top-1">{reliability}</h1>
                <h1 className="font-bold text-[13px]  relative -top-2 w-20 text-end">{status}</h1>
            </div>
            <h1 className="text-[16px]  text-card-foreground/80 my-3">{description}</h1>

            <div className="rounded-full w-[32px] h-[32px] mb-3 overflow-hidden">
                <img src={authorAvatar} alt="" className="w-full h-full object-cover" />
            </div>
        </div>
    );
}
