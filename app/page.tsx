import Image from "next/image";
import {MemeUploader} from "@/app/UploadImage";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export default async function Home() {


  const data = await fetch('https://api.meme.vividcats.org/api/memes')
  const posts = await data.json()


  return (
      <div>
          <div className='p-20'>
                <MemeUploader />
          </div>

      </div>

  )

}
