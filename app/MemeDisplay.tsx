import Image from "next/image";

export const MemeDisplay = async () => {
    const data = await fetch('https://api.meme.vividcats.org/api/memes')
    const posts = await data.json()

    return (
        <div>
            {posts?.map(({id, imageUrl,keywords}) => (
                <li key={id}>
                    <Image src={imageUrl} alt={keywords?.[0]} />
                </li>

            ))}
        </div>
    )
}