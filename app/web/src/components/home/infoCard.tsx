export default function InfoCard() {
    return (
        <div className="h-[417px] w-full flex flex-col">
            <div className="bg-secondary rounded-[20px] w-full h-[194px] lg:h-[350px]">
                <img src="" alt="" />{" "}
            </div>
            <div className="flex flex-row justify-between">
                <h1 className="font-bold text-[16px] w-[291px]">Local grain market prices remain reports</h1>
                <p className="text-[14px] text-card-foreground/30">il y a 2h</p>
            </div>
            <div className="flex flex-row justify-between relative">
                <div className="h-[4px] w-[80%] bg-card-foreground flex justify-between">
                    <div className="h-full w-[90%] bg-primary"></div>
                </div>
                <h1 className="text-primary text-[10px] relative -top-1">90%</h1>
                <h1 className="font-bold text-[13px]  relative -top-2">fiable</h1>
            </div>
            <h1 className="text-[16px]  text-card-foreground/80 my-3">
                Independent monitors across Ségou report consistent pricing for staple crops, refuting early rumors of
                artificial inflation.
            </h1>

            <div className="bg-gray-600 rounded-full w-[32px] h-[32px] mb-3"></div>
        </div>
    );
}
