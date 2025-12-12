import UnderConstructionImage from "@/public/construction-image.png"
import Image from "next/image"

export default function SettingsPage() {
    return (

        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            

            <Image 
                src={UnderConstructionImage} 
                alt="Under Construction" 
                fill
                className="object-cover z-0"
                priority 
            />


            <div className="absolute inset-0 bg-black/50 z-10" />

            <div className="relative z-20 flex flex-col items-center border-4 border-black justify-center text-center p-8 bg-accent-white font-montserrat rounded-lg shadow-xl max-w-2xl mx-4">

                <span className="text-6xl mb-4">🚧</span>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Page Under Construction
                </h1>
                
                <p className="text-lg text-gray-700">
                    We are working hard to improve the Settings page. <br />
                    Please check back soon!
                </p>
            </div>

        </div>
    )
}