"use client"

import {Meme} from "@/app/meme";
import {useRouter} from "next/navigation";

export const ImageView = ({posts}: { posts: Meme }) => {
    const router = useRouter()

    const onBackHome = () => {
        router.push("/");
    };
    return (
        <div className="flex flex-col p-4 gap-6">
            <button onClick={onBackHome} className="bg-indigo-500 text-amber-50 p-4 ">回首頁</button>
            <div className="flex justify-center items-top">
                <img className="w-full lg:w-2/5 md:3/4" src={posts?.imageUrl} alt=""/>
            </div>
        </div>
    );
};
