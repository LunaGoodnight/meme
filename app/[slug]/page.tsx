export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await params

    const data = await fetch(`https://api.meme.vividcats.org/api/memes/${slug}`)
    const posts = await data.json()

    if (posts) {
        return <div>
            <img src={posts?.imageUrl} alt=""/>
        </div>
    }
    return <div>No such image</div>

}