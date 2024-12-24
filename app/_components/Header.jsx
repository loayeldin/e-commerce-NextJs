'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import SkeletonAnimation from '../product-details/_components/SkeletonAnimation'

import { usePathname } from 'next/navigation'
import { cartContext } from '../_context/CartContext'
import CartApis from '../_utils/CartApis'
import Cart from '../_components/Cart'

 function Header() {
  const {user,isLoaded} = useUser() ;
  const {cart , setCart} = useContext(cartContext)
  const [showCart, setShowCart] = useState(false)
  const path = usePathname(); 
  const[hideHeader,setHideHeader] = useState(null)
  const getCartItems = ()=>{
    CartApis.getUserCart(user?.primaryEmailAddress?.emailAddress).then((res)=>{
      console.log('fetched cart items........',res.data);

      const newCart = res.data.data.map((cartItem) => ({
        id: cartItem.id,
        documentId: cartItem.documentId,
        product: cartItem.products[0],
      }));
      setCart(newCart);
    })
  }
  useEffect(()=>{
      if(path.toString().includes('sign-in')){
        setHideHeader(true)
      }else{
        setHideHeader(false)
      }
     
     user&& getCartItems()
    


  },[path,user])
  if(hideHeader===null){
    return null;
  }
  
  return  !hideHeader && (
    <header  className="bg-white shadow-md">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
      <div className="flex h-16 items-center justify-between">
        <div className="md:flex md:items-center md:gap-12">
          <Image src='/logo.svg' width={40} height={40} alt="logo img"/>
        </div>
  
        <div className="hidden md:block">
          <nav aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Home </a>
              </li>
  
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Explore </a>
              </li>
  
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
              </li>
  
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About Us </a>
              </li>
  
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Contact Us </a>
              </li>
  
             
            </ul>
          </nav>
        </div>
  
        <div className="flex items-center gap-4">
          {
          isLoaded ?  (
            !user ?
            ( 
              <div className="sm:flex sm:gap-4">
                  <a
                    className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-teal-500"
                    href="/sign-in"
                  >
                    Login
                  </a>
        
                  <div className="hidden sm:flex">
                    <a
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-teal-500"
                      href="#"
                    >
                      Register
                    </a>
                </div>
              </div>
            )
            :
            (
            <div className='flex gap-x-3'>
              <h2 className='flex gap-x-1 text-sm text-primary hover:cursor-pointer'
              onClick={()=>setShowCart(!showCart)}
              >
                <ShoppingCart />
                ({cart?.length})
               
              </h2>
              <Cart showCart={showCart} setShowCart={setShowCart}/>
              <h2 className='flex items-center gap-x-2 text-sm text-primary'>
                <UserButton/>
                {user?.fullName}  
              </h2>
            </div>
            )
          ):
          (
            <SkeletonAnimation width={'200px'} height={'20px'}/>
          )
         
          }
  
          <div className="block md:hidden">
            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header