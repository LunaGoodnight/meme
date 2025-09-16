import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await fetch(`https://api.meme.vividcats.org/api/memes/${slug}`);
  const posts = await data.json();

  const imageUrl = posts?.imageUrl;

  return {
    title: posts?.title || "Meme",
    description: posts?.description || "Check out this meme!",
    openGraph: {
      title: posts?.title || "Meme",
      description: posts?.description || "Check out this meme!",
      images: [imageUrl],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: posts?.title || "Meme",
      description: posts?.description || "Check out this meme!",
      images: [imageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await fetch(`https://api.meme.vividcats.org/api/memes/${slug}`);
  const posts = await data.json();

  if (posts) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <img
          className="w-full h-auto object-contain md:max-w-none md:max-h-none md:w-auto"
          src={posts?.imageUrl}
          alt=""
        />
      </div>
    );
  }
  return <div>No such image</div>;
}
