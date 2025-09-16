import MemeCard from "@/app/MemeCard";
import {Meme} from "@/app/meme";

export const MemeDisplay = async () => {
    const data = await fetch('https://api.meme.vividcats.org/api/memes')
    const posts = await data.json()

    return (
        <ul className='list-none flex flex-wrap'>
            {posts?.map((item: Meme, index: number) => (
                <li className="p-6 lg:max-w-1/3" key={index}>
                    <MemeCard meme={item}/>
                </li>

            ))}
        </ul>
    )
}