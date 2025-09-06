import Image from "next/image";

export default async function Home() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
      <ul>
        {posts?.map(({id, imageUrl}) => (
            <li key={id}>
              <Image
                  src={imageUrl}
                  alt="Next.js logo"
                  priority
              />
            </li>
        ))}
      </ul>
  )

}
