export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await params

    const data = await fetch(`https://api.meme.vividcats.org/api/memes/${slug}`)
    const posts = await data.json()

    const img = 'https://apl-hamivideo.cdn.hinet.net/HamiVideo/getHamiVideoImg.php?imageId=sourceImages@4048100287_o_20250805191400.jpg'
    const webp = 'https://i.imgur.com/aCx5BYJ_d.webp'
    if (posts) {
        return <div className='flex justify-center items-center min-h-screen p-4'>
            <img className='w-full h-auto object-contain md:max-w-none md:max-h-none md:w-auto'
                 src={posts?.imageUrl}
                 alt=""/>
        </div>
    }
    return <div>No such image</div>

}