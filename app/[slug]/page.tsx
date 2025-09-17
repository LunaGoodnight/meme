import { Metadata } from "next";
import { ImageView } from "@/app/[slug]/ImageView";

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
  console.log(slug)
  if (slug.includes(".") && posts) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <img
          className="h-auto object-contain md:max-w-none md:max-h-none sm:w-full"
          src={posts?.imageUrl}
          alt=""
        />
      </div>
    );
  }
  if (posts) {
    return <ImageView posts={posts} />;
  }
  return <div>No such image</div>;
}
