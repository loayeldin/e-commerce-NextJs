import Image from 'next/image'
import React from 'react'
import { hostName } from '../_utils/axiosClient';
import { List } from 'lucide-react';
import Link from 'next/link';

function ProductItem({item}) {
    

  return (
    <Link href={`/product-details/${item.documentId}`} className=' rounded-lg  mb-5 border-teal-400 border shadow-md shadow-teal-100 hover:cursor-pointer'>
       <Image src={`${item.banner.url}`}
        width={400}
        height={300}
        alt='banner img'
        className=' p-2 rounded-t-lg h-[300px] w-[100vw] object-fill '
        />
       <div className='flex flex-col justify-between p-3 bg-gray-50 rounded-b-lg min-h-24 hover:text-primary transition-all'>
      
                  <h2 className='text-[16px] font-medium line-clamp-2'>{item.title}</h2>
                  {/* <p className='text-[14px] mt-2 line-clamp-2'>{item?.description[0]?.children[0]?.text}</p> */}

                
                  <div className='flex justify-between '> 
                    <h2 className='text-[13px] text-gray-400 flex gap-2 items-center '>
                          <List className='w-4 h-4'/>
                          {item.category}
                    </h2>
                    <h2 className='text-teal-500'> ${item.price}</h2>
                  </div>
   
         
       </div>

    </Link>
  )
}

export default ProductItem