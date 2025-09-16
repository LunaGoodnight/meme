import {MemeUploader} from "@/app/UploadImage";
import {MemeDisplay} from "@/app/MemeDisplay";


export default async function Home() {
    return (
        <div>
            <div className='lg:p-20 p-6'>
                <MemeUploader/>
            </div>
            <div className='lg:p-20 md:p-6'>
                <MemeDisplay/>
            </div>
        </div>

    )

}
