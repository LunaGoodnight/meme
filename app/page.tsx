import {MemeUploader} from "@/app/UploadImage";
import {MemeDisplay} from "@/app/MemeDisplay";


export default async function Home() {
    return (
        <div>
            <div className=''>
                <MemeUploader/>
            </div>
            <div className='lg:p-20 '>
                <MemeDisplay/>
            </div>
        </div>

    )

}
