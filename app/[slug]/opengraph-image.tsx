import { ImageResponse } from 'next/og'

export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
    const {slug} = await params

    const data = await fetch(`https://api.meme.vividcats.org/api/memes/${slug}`)
    const posts = await data.json()


    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 48,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {posts?.keywords?.[0] ?? '梗圖站站'}
            </div>
        ),
        {
            ...size,
        }
    )
}