import Image from 'next/image'
import React from 'react'
import { hostName } from '../_utils/axiosClient';
import { List } from 'lucide-react';
import Link from 'next/link';

function ProductItem({item}) {
    
    console.log(item.documentId);
  return (
    <Link href={`/product-details/${item.documentId}`} className='rounded-lg p-1  border-teal-400 hover:border hover:shadow-md hover:cursor-pointer'>
       <Image src={`${item.banner.url}`}
        width={400}
        height={350}
        alt='banner img'
        className='rounded-t-lg h-[250px] w-[100%] object-fill'
        />
       <div className=' flex justify-between items-center p-3 bg-gray-100 rounded-b-lg'>
        <div className=''>
                <h2 className='text-[18px] font-medium line-clamp-1'>{item.title}</h2>

                <h2 className='text-[13px] text-gray-400 flex gap-2 items-center'>
                    <List className='w-4 h-4'/>
                    {item.category}
                </h2>
            </div>
            <div>
                <h2>{item.price}</h2>
            </div>
       </div>

    </Link>
  )
}

export default ProductItem