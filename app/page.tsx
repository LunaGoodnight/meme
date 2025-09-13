import {MemeUploader} from "@/app/UploadImage";
import {MemeDisplay} from "@/app/MemeDisplay";


export default async function Home() {
    return (
        <div>
            <div className='p-20'>
                <MemeUploader/>
            </div>
            <div className='p-20'>
                <MemeDisplay/>
            </div>
        </div>

    )

}
