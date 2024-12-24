import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import SkeletonAnimation from './SkeletonAnimation'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CartApis from '../../_utils/CartApis'
import { cartContext } from '../../_context/CartContext'
import {  toast } from 'react-toastify';

function ProductDetailsInfo({product}) {
  const {user} = useUser()
  const router = useRouter();
  const {cart,setCart} = useContext(cartContext)
  const handleAddToCart = ()=>{
    if(!user){
      router.push('/sign-in')
    }else{
      const data = {
          username:user.fullName,
           email:user.primaryEmailAddress.emailAddress,
           products: [product.documentId]
      }
      console.log(data);
      CartApis.addToCart(data).then(res=>{
        
        setCart((oldCart)=>[
          ...oldCart,
          {
            id:res.data.data.id,
            documentId:res.data.data.documentId,
            product:product
          }
        ])
        toast.success('Item Added Successfully')
     
      }).catch(err=>{
        console.log('error', err.response.data);
      })
    }
  }
  return (
    <>
    {
    product?
      <div >
            <h2 className='text-[20px]'>{product?.title}</h2>
            <h2 className='text-[15px] text-gray-400'>{product?.category}</h2>
            <h2 className='text-[15px] mt-5'>{product?.description[0]?.children[0]?.text}</h2>
            
            <h2 className='text-[13px] text-gray-500 flex gap-2 my-3'>
              {
                product?.instantDelivery ?
                <BadgeCheck className='text-green-500 w-5 h-5'/>
                :
                <AlertOctagon/> 
              }
              eligible for instant delivery
              </h2>

            <h2 className='text-primary text-[32px] my-4'> ${product?.price}</h2>
            <button 
            onClick={handleAddToCart}
            className='capitalize flex gap-2 
            rounded-lg p-3 hover:bg-teal-600 bg-primary text-white'>
              <ShoppingCart/>
              add to cart
            </button>
        </div>
      :
      <div>
        <SkeletonAnimation width={'300px'} height={'20px'}/>
        <SkeletonAnimation width={'70px'} height={'20px'}/>
        <SkeletonAnimation width={'300px'} height={'20px'}/>
        <SkeletonAnimation width={'80px'} height={'20px'}/>
        <SkeletonAnimation width={'80px'} height={'20px'}/>
        <SkeletonAnimation width={'70px'} height={'20px'}/>

      </div>
    }
          
    </>
  )
}

export default ProductDetailsInfo