import MemeCard from "@/app/MemeCard";
import {Meme} from "@/app/meme";

export const MemeDisplay = async () => {
    const data = await fetch('https://api.meme.vividcats.org/api/memes')
    const posts = await data.json()

    return (
        <ul className='list-none'>
            {posts?.map((item: Meme, index: number) => (
                <li className="p-6" key={index}>
                    <MemeCard meme={item}/>
                </li>

            ))}
        </ul>
    )
}