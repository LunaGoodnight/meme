
export const MemeDisplay = async () => {
    const data = await fetch('https://api.meme.vividcats.org/api/memes')
    const posts = await data.json()

    return (
        <div>
            {posts?.map(({id, imageUrl, keywords}: { id: number; imageUrl: string; keywords: string }) => (
                <li key={id} className="p-6">
                    <img src={imageUrl} alt={keywords?.[0]}/>
                </li>

            ))}
        </div>
    )
}