import React, { useContext } from 'react'
import { cartContext } from '../_context/CartContext'
import { ChevronLeft, CircleX } from 'lucide-react';
import Image from 'next/image';
import { hostName } from '../_utils/axiosClient';
import CartApis from '../_utils/CartApis';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';
function Cart({showCart,setShowCart}) {
    const router = useRouter();
    const{cart,setCart} = useContext(cartContext);
    const calcTotalPrice= ()=>{
        return cart.reduce((total,cItem)=>total+=cItem.product.price,0)
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
        
        console.log(documentId,'selected cart');
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
                        <div className='grid grid-cols-12 my-8' key={cItem.id}>
                            <div className='col-span-4  rounded-lg' >
                                <Image 
                                src={`${cItem?.product?.banner?.url}`}
                                width={200}
                                height={200}
                                alt='product-img '
                                className='h-[100%] rounded-lg'
                                />
                            </div>
                            <div className='col-span-8 px-4 gap-2  grid grid-cols-12 '>
                               
                               <div className='col-span-9 flex flex-col justify-between'>
                                    <h2>{cItem.product.title}</h2>
                                   
                                
                                   <h2 className='text-[14px] text-primary'>{cItem.product.category}</h2>
                                   
                                   <h2 className='line-clamp-2 text-[13px] text-gray-500'>
                                               {cItem.product.description[0].children[0].text}
                                   </h2>
                               </div>
                               

                               <div className='col-span-3  flex flex-col justify-between items-end'>
                                    <h3>${cItem.product.price}</h3>
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
                        <span>
                            $
                            {
                                cart.length>0 ?
                                + calcTotalPrice() : 0
                            }
                         </span>
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
                            onClick={()=>router.push(`/checkout?amount=${calcTotalPrice()}`)}
                            >
                                pay with stripe
                            </button>
                     
                    </div>
                 
        
             
          </div>
       
        </div>
      )
}

export default Cart