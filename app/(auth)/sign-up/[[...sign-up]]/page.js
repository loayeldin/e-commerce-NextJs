import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
export default function Page() {
  return  (


    <section className="">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex flex-col h-32 items-center justify-center bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 sm:hidden  lg:block">
          <div className="hidden lg:relative lg:block lg:p-12">
            <div className='flex gap-x-2 items-end'>
              <Link className="block text-white" href="/">
                
                <Image
                src='/logo.svg'
                width={40}
                height={40}
                alt='logo-img'
                />
                
              </Link>
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Welcome to e-commerce 🦑
              </h2>
            </div>
         
    
            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
              quibusdam aperiam voluptatum.
            </p>
          </div>
          <div className=' text-center flex justify-center'>
          <Image src='/undraw_authentication_tbfc.svg' 
              width={350} 
              height={300}
              alt='auth img'
              className='auth-img object-contain text-center '
           />
          </div>
    
          
     
        </section>
    
        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
         
      
    
            <SignUp/>
         
        </main>
      </div>
    </section>
      )
}