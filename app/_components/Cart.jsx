import React, { useContext } from 'react'
import { cartContext } from '../_context/CartContext'
import { ChevronLeft, CircleX } from 'lucide-react';
import Image from 'next/image';
import { hostName } from '../_utils/axiosClient';
import CartApis from '../_utils/CartApis';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
import Counter from './Counter';
import { useUser } from '@clerk/nextjs';
function Cart({showCart,setShowCart}) {
    const {user} = useUser()
    const router = useRouter();
    const{cart,setCart} = useContext(cartContext);
   const handleCartItemQuantity=  (itemId,newQuantity)=>{
    console.log(itemId,newQuantity);
        setCart(oldCart=>
         
            oldCart.map(item=>{
              
             return item.id ===itemId ? {...item , quantity:newQuantity} :item
            })
        )
    }
    const handleSaveCart =async (e)=>{
        e.stopPropagation()
        const dataTemplate = {
            username:user.fullName,
             email:user.primaryEmailAddress.emailAddress,
             products:[] ,
             quantity:null,
        }
        const updatePromises = cart.map(cartItem=>{
            const data = {
                ...dataTemplate,
                products: [cartItem.product.documentId],
                quantity: cartItem.quantity,
            };
            console.log(data, 'from cart');
           return CartApis.updateCart(data,cartItem.documentId)
        })
        try{
            await Promise.all(updatePromises)
            toast.success('Cart Updated Successfully')
        }
        catch(err){
            toast.error(err.message)
            }
     }
  
    const calcTotalPrice= ()=>{
        return cart.reduce(
            (total,cItem)=>total+=cItem.product.price * cItem.quantity,
            0)
    }
    const handleDeleteCart = (e,documentId)=>{
        e.stopPropagation()
        CartApis.deleteCartItem(documentId).then(res=>{
            console.log(res);
            toast.success('Item Deleted Successfully')
            if(res.status ==204){
                setCart((oldCart)=>{
                  return  oldCart.filter(item=>item.documentId !== documentId)
                })
            }
        })
        
    
    }
    console.log(cart,' from cart...........');
    return (
        <div className={`cart-wrapper ${showCart? 'active':''} hover:cursor-pointer`}
        onClick={()=>setShowCart(!showCart)}
        >
          <div className="cart-container flex flex-col">
            <button
            type="button"
            className="flex items-center"
            onClick={()=>setShowCart(!showCart)}
            >
               <ChevronLeft />
              <span className="capitalize text-[17px]">Your Cart </span>
              <span className="mx-1 text-[17px] text-teal-500">({cart.length} items)</span>
            </button>
    
           
                {
                   cart.length>0  && cart.map((cItem)=>(
                        <div className='grid grid-cols-12 my-8 ' key={cItem.id}>
                            <div className='col-span-4  rounded-lg h-[140px]' >
                                <Image 
                                src={`${cItem?.product?.banner?.url}`}
                                width={200}
                                height={200}
                                alt='product-img '
                                className='h-[100%] rounded-lg object-contain'
                                />
                            </div>
                            <div className='col-span-8 px-4 gap-2  grid grid-cols-12 '>
                               
                               <div className='col-span-9 flex flex-col justify-between'>
                                    <h2 className='text-[14px]'>{cItem.product.title}</h2>
                                   
                                
                                   <h2 className='text-[14px] text-primary'>{cItem.product.category}</h2>
                                   
                                   <h2 className='line-clamp-2 text-[13px] text-gray-500'>
                                               {cItem.product.description[0].children[0].text}
                                   </h2>
                             
                                   <span className='mt-2'>
                                   
                                    <Counter quantity={cItem.quantity} handleCartItemQuantity={(newQuantity)=>{handleCartItemQuantity(cItem.id,newQuantity)}}/>
                                   </span>
                               </div>
                               

                               <div className='col-span-3  flex flex-col justify-between items-end'>
                                    <h3 className='text-primary'>${cItem.product.price}</h3>
                                    <span>
                                        <CircleX 
                                        className='w-5 h-5  text-red-600 self-end hover:cursor-pointer'
                                        onClick={(e)=>{handleDeleteCart(e,cItem.documentId)}}
                                        />

                                    </span>
                               </div>
                            </div>
                        </div>
                    ))

                    
                }
                {
                    cart.length ==0 && 
                    <Image className='text-center' src='/empty.svg' width={400} height={250} alt='empty-cart-img'/>
                }
               
             
                    <div className='mt-auto  flex justify-between mb-4 '>
                        <h3 className='capitalize text-lg'>subtotal:</h3>
                        <span className='text-primary'>
                            $
                            {
                                cart.length>0 ?
                                + calcTotalPrice().toFixed(2) : 0
                            }
                         </span>
                    </div>

                    <div className='text-center my-2'>
                        <button className='
                                bg-red-500
                                text-white 
                                rounded-full
                                px-20
                                md:px-16
                                py-2
                                
                                '
                                onClick={handleSaveCart}
                                >
                                save cart
                        </button>
                        <button className='
                                bg-teal-500
                                text-white 
                                rounded-full
                                px-20
                                md:px-16
                                py-2
                                my-2
                                md:my-2
                                ml-0
                                md:ml-9
                                '
                            
                                >
                                view cart
                        </button>
                    </div>

                    <div className='text-center'>
                   
                       
                        <button className='
                            bg-teal-500
                            text-white 
                            rounded-full
                            px-16
                            md:px-40
                            py-2
                            disabled:opacity-50
                            '
                            disabled={cart.length === 0}
                            onClick={()=>router.push(`/checkout?amount=${calcTotalPrice().toFixed(2)}`)}
                            >
                                pay with stripe
                            </button>
                     
                    </div>
                 
        
             
          </div>
       
        </div>
      )
}

export default Cart