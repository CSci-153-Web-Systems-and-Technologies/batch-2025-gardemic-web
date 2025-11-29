import Image from 'next/image';
import AuthBackground from '@/public/auth-bg-image.png';

export default function Login() {
  return (
    <div className="grid grid-cols-4 h-screen">
      <div className='relative overflow-hidden col-span-2'>
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <h1 className='font-aclonica text-4xl md:text-5xl lg:text-6xl p-8 text-accent-white z-20'>
            Gardemic
          </h1>
          
          <p className='font-aclonica text-xl md:text-3xl lg:text-4xl p-8 text-center text-accent-white z-20'>
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
        />
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>
      
      <div className='bg-accent-white flex col-span-2'>
      
      </div>
    </div>
  );
}