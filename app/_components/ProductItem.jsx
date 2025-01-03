import Image from 'next/image'
import React, { useContext } from 'react'
import { List } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { cartContext } from '../_context/CartContext';
import CartApis from '../_utils/CartApis';
import {  toast } from 'react-toastify';
function ProductItem({item}) {
  const {user} = useUser()
  const router = useRouter();
  const {cart,setCart} = useContext(cartContext)
  const handleAddToCart = (e)=>{
  
    e.stopPropagation()
    if(!user){
      router.push('/sign-in')
    }else{
  
      const data = {
          username:user.fullName,
           email:user.primaryEmailAddress.emailAddress,
           products: [item.documentId],
           quantity:1
      }
  

     let ItemIndexInCart =  cart.findIndex(cartItem=>{
        return cartItem.product.documentId === item.documentId
      })
      console.log(ItemIndexInCart,'foundItem');
      if(ItemIndexInCart !==-1){ // check if the item exist in cart
        console.log('updated');
        //update item 
        const updatedCart = [...cart]
        updatedCart[ItemIndexInCart] = {
          ...updatedCart[ItemIndexInCart],
          quantity:Number(updatedCart[ItemIndexInCart].quantity)+1
        }
   

        data.quantity = updatedCart[ItemIndexInCart].quantity
        console.log(data,'dataaaaaaaaaaaaaaaa' );
        CartApis.updateCart(
          data,
          updatedCart[ItemIndexInCart].documentId
          ).then(res=>{
            console.log('updateddd',res);
            setCart(updatedCart)
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
              product:item,
              quantity:1
            }
          ])
          toast.success('Item Added Successfully')
       
        }).catch(err=>{
          console.log('error', err.response.data);
        })
      }

      console.log('finished');
    
    }
  }

  return (
  <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    <Link href={`/product-details/${item.documentId}`}>
      <div className="relative flex items-end overflow-hidden rounded-xl">
        <Image 
          width={300}
          height={200}
        src={`${item.banner.url}`} 
        alt={item.title}
        className=' p-2 rounded-t-lg h-[250px] w-[100vw] object-fill '
         />
      
      </div>

      <div className="mt-1 p-2 min-h-36 flex flex-col justify-between">
        <h2 className="text-slate-700 className='text-[16px]  line-clamp-2">{item.title}</h2>
        <p className="mt-1 text-sm text-slate-400 line-clamp-2">{item?.description[0]?.children[0]?.text}</p>
        <h2 className='text-[13px] text-slate-400 flex gap-2 items-end '>
          <List className='w-4 h-4 text-primary'/>
          {item.category}
       </h2>
       </div>
       </Link>
        <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-bold text-primary">${item.price}</p>

          <div className="flex items-center space-x-1.5 rounded-lg bg-primary px-4 py-1.5 text-white duration-100 hover:bg-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            <button className="text-sm" onClick={handleAddToCart}>Add to cart</button>
          </div>

        </div>
   
   
  </article>
  )
}

export default ProductItem