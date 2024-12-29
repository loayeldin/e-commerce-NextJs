'use client'

import React, { useEffect, useState } from 'react'
import OrderApi from '../_utils/OrderApi'
import { useUser } from '@clerk/nextjs'
import OrderProduct from './_components/OrderProduct'
import BreadCrumb from '../_components/BreadCrumb'
import { usePathname } from 'next/navigation'
function UserOrders() {
  const {user}= useUser()
  const [orders, setOrders] = useState()
  const path = usePathname()
  useEffect(()=>{
    if(user){
      OrderApi.getOrder(user?.primaryEmailAddress?.emailAddress).then(res=>{
        console.log(res.data);
        setOrders(res.data)
      })
    }
 
 
  },[user])
  return (
    <div className='px-5 md:px-10 lg:px-32 my-5'>
       <BreadCrumb path={path}/>

       
        {
         
        orders && 
          orders.data.map(orderItem=>{
            const formattedPlacedDate = new Date(orderItem.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false,
            });
            const formattedUpdateDate = new Date(orderItem.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false,
            });
            const shippingSteps = ['pending', 'processing', 'shipped', 'out for delivery', 'delivered'];
            const currentStepIndex = shippingSteps.indexOf(orderItem.shippingstatus?.toLowerCase());
              console.log(orderItem.shippingstatus);
          return(
            <div key={orderItem.id} className='rounded-lg p-4 mb-5' style={{boxShadow:'0 2px 10px #0000001a'}}> 
            <h1 className='text-2xl capitalize mb-3'>order
              <span className='text-primary'>#{orderItem.id}</span>
            </h1>
            
           { 
           orderItem.products.map(product=>{
              const quantity = orderItem.productQuantities[product.documentId] ;
              return(
              <OrderProduct
              key={product.id}
                product={product}
                quantity={quantity}
                 />
                 ) 
            })
            }

            <div className='border-t-2  text-xs md:text-[15px] gap-y-2  py-3 flex flex-col md:flex-row justify-between flex-wrap px-1'>
              <div className='flex gap-x-1 md:gap-x-2 items-center'>
                <h3 className='capitalize text-primary ' >order placed on  </h3>
                <span>{formattedPlacedDate}</span>
              </div>
              <div className='flex gap-x-1 md:gap-x-2 items-center'>
                <h3 className='capitalize text-primary'>order Updated on  </h3>
                <span>{formattedUpdateDate}</span>
              </div>
              <div className='flex  gap-x-1 md:gap-x-2 items-center'>
                <h3 className='text-primary capitalize'>total price: </h3>
                <span> ${orderItem.amount}</span>
              </div>
           
            </div>

            <ul className="steps steps-vertical md:steps-horizontal  w-[100%] my-5 text-sm md:text-[15px] text-gray-600">
                  {shippingSteps.map((step, index) => (
                    <li
                      key={step}
                      className={`step ${index <= currentStepIndex ? 'step-primary' : ''} `}
                    >
                      {step.charAt(0).toUpperCase() + step.slice(1)}
                    </li>
                  ))}
                </ul>

           
          </div>
            )
        
            
            })
      }
    
    </div>
  )
}

export default UserOrders