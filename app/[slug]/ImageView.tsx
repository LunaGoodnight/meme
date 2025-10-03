"use client"

import {Meme} from "@/app/meme";
import {useRouter} from "next/navigation";
import {useState} from "react";

export const ImageView = ({posts}: { posts: Meme }) => {
    const router = useRouter()
    const [copied, setCopied] = useState(false);

    const onBackHome = () => {
        router.push("/");
    };

    const onCopyImageUrl = () => {
        void navigator.clipboard.writeText(posts.imageUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="flex flex-col p-4 gap-6">
            <div>
                <button onClick={onBackHome} className="bg-indigo-500 text-amber-50 p-4 ">回首頁</button>
            </div>
            <div className="flex justify-center items-top">
                <img className="w-full lg:w-2/5 md:3/4" src={posts?.imageUrl} alt=""/>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={onCopyImageUrl}
                    className={`p-4 rounded transition-all ${
                        copied
                            ? 'bg-blue-500 text-white'
                            : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                >
                    {copied ? '✓ 已複製' : '複製圖片網址'}
                </button>
            </div>
        </div>
    );
};
