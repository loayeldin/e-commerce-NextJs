import { AlertOctagon, BadgeCheck, List, ShoppingCart, Star, StarIcon, Stars } from 'lucide-react'
import React, { useContext, useState } from 'react'
import SkeletonAnimation from './SkeletonAnimation'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CartApis from '../../_utils/CartApis'
import { cartContext } from '../../_context/CartContext'
import {  toast } from 'react-toastify';
import Counter from'../../_components/Counter'
function ProductDetailsInfo({product}) {
  const [quantity ,setQuantity] = useState(1)
  const handleQuantityDetials = (newQuantity) => {
    setQuantity(newQuantity)
  

 
};
  const {user} = useUser()
  const router = useRouter();
  const {cart,setCart} = useContext(cartContext)
  const handleAddToCart = ()=>{
    if(!user){
      router.push('/sign-in')
    }else{
      console.log(quantity, ' from add cart');
      const data = {
          username:user.fullName,
           email:user.primaryEmailAddress.emailAddress,
           products: [product.documentId],
           quantity:1
      }
  

     let ItemIndexInCart =  cart.findIndex(cartItem=>{
        return cartItem.product.documentId === product.documentId
      })
      console.log(ItemIndexInCart,'foundItem');
      if(ItemIndexInCart !==-1){
        console.log('updated');
        //update item 
        const updatedCart = [...cart]
        updatedCart[ItemIndexInCart] = {
          ...updatedCart[ItemIndexInCart],
          quantity:Number(updatedCart[ItemIndexInCart].quantity)+quantity
        }
   

        data.quantity = updatedCart[ItemIndexInCart].quantity
        console.log(data,'dataaaaaaaaaaaaaaaa' );
        CartApis.updateCart(
          data,
          updatedCart[ItemIndexInCart].documentId
          ).then(res=>{
            console.log('updateddd',res);
            setCart(updatedCart)
            setQuantity(1)
            toast.success('Item updated Successfully')
            

          })

      }else{
        // add new item cart
        CartApis.addToCart(data).then(res=>{
        
          setCart((oldCart)=>[
            ...oldCart,
            {
              id:res.data.data.id,
              documentId:res.data.data.documentId,
              product:product,
              quantity:quantity
            }
          ])
          toast.success('Item Added Successfully')
          setQuantity(1)
       
        }).catch(err=>{
          console.log('error', err.response.data);
        })
      }

      console.log('finished');
    
    }
  }
  return (
    <>
    {
    product?
      <div className='flex flex-col gap-y-1 md:gap-y-4' >
            <h2 className='text-[15px] text-gray-400 flex gap-1 items-center'>
            <List className='w-4 h-4'/>
              {product?.category}
              </h2>

            <h2 className='text-[24px]'>{product?.title}</h2>
            <h2 className='text-[15px] mt-5 text-gray-400 leading-7'>{product?.description[0]?.children[0]?.text}</h2>
            <div className='flex items-center gap-2 mt-3'>
            
                <span>{product.rating.rate}</span>
                <span className='flex gap-x-1'>
                  {
                    Array.from({length:Math.ceil(product?.rating?.rate)}).map((_,index)=>(
                      <StarIcon key={index} className='text-yellow-500 fill-yellow-500 w-4 h-4'/>

                    ))
                  }
                </span>
                <span className='capitalize ml-5 text-[14px] '>(reviews  {product.rating.count} )</span>

            
            </div>
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
            
          
            <div className='flex gap-x-6'>
              <Counter quantity={quantity} handleQuantityDetials={(quantity)=>handleQuantityDetials(quantity)}/>
              <button 
              onClick={handleAddToCart}
              className='capitalize flex gap-2 
              rounded-lg p-3 hover:bg-teal-600 bg-primary text-white'>
                <ShoppingCart/>
                add to cart
              </button>

            </div>
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