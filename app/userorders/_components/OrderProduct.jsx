import React from 'react'
import Image from 'next/image'
import { AlertOctagon, BadgeCheck, List } from 'lucide-react';
function OrderProduct({product,quantity}) {
 
  return (
    <div className='grid grid-cols-12 mb-4 gap-x-5 ' >
        <div className='col-span-12 md:col-span-2  rounded-md overflow-hidden'>
            <Image 
            src={product.banner.url}
            className='w-[100%] h-[150px] object-fill  '
            width={200}
            height={200}
            alt='product img'
            />
        </div>

        <div className='col-span-12 md:col-span-6 '>
            <h3 className='mb-2'>{product.title}</h3>
      
            <p className='flex gap-x-2 items-center text-primary mb-2'>
                <List className='w-4 h-4'/>
                 <span>{product.category}</span>
            </p>
            <p className='text-[14px] text-gray-400 mb-2 line-clamp-4'>{product?.description[0]?.children[0]?.text}</p>
        </div>
        <div className='col-span-12 md:col-span-4  '>
            <div className='flex gap-x-2 items-center mb-3'>
                <h3 className='text-[17px] text-primary'>price: </h3>
                <span>${product.price}</span>
            </div>
            <div className='flex gap-x-2 items-center mb-3'>
                <h3 className='text-[17px] text-primary'>Quantity: </h3>
                <span>{quantity}</span>
            </div>
            <h2 className='text-[13px] text-gray-500 flex  gap-2 my-3'>
              {
                product?.instantDelivery ?
                <BadgeCheck className='text-green-500 w-5 h-5'/>
                :
                <AlertOctagon/> 
              }
              eligible for instant delivery
              </h2>
            
            
        </div>
        
    </div>
  )
}

export default OrderProduct