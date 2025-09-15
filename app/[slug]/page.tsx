export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const {slug} = await params

    const data = await fetch(`https://api.meme.vividcats.org/api/memes/${slug}`)
    const posts = await data.json()

    if (posts) {
        return <div className='flex justify-center items-center min-h-screen w-full p-4'>
            <img className='w-full max-w-2xl h-auto object-contain md:w-auto md:max-h-[80vh]'
                 src={posts?.imageUrl}
                 alt=""/>
        </div>
    }
    return <div>No such image</div>

}