import Image from "next/image";
import AuthBackground from "@/public/auth-bg-image.png";
import { CreateAccountForm } from "./_components/CreateAccountForm";

export default function CreateAccount()
{
  return (

    <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen">
      
      <div className='hidden lg:block relative overflow-hidden lg:col-span-2'>
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='font-aclonica text-5xl lg:text-6xl p-8 text-accent-white z-20 text-center'>
            Gardemic
          </h1>
          
          <p className='font-aclonica text-3xl lg:text-4xl p-8 text-center text-accent-white z-20'>
            Grow a Garden 
            <br /> 
            Grow a Future  
          </p> 
        </div>

        <Image 
          src={AuthBackground}
          alt="Background for Auth Pages"
          fill
          className='object-cover'
          priority
        />
        <div className="absolute inset-0 bg-black/35 z-10"></div>
      </div>
      
      <div className='bg-accent-white flex col-span-1 lg:col-span-2 w-full'>
        <CreateAccountForm className="m-auto w-full" />
      </div>
    </div>
  );
}