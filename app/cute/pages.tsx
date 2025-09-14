export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    return <div>878787</div>
}