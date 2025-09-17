import MemeCard from "@/app/MemeCard";
import {Meme} from "@/app/meme";

export const MemeDisplay = async () => {
    const data = await fetch('https://api.meme.vividcats.org/api/memes', { cache: "no-store" });
    const posts = await data.json()

    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-4 p-6">
            {posts?.map((item: Meme, index: number) => (
                <div className="break-inside-avoid mb-4" key={index}>
                    <MemeCard meme={item}/>
                </div>
            ))}
        </div>
    )
}