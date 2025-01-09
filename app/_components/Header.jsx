'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { CircleX, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState,useCallback} from 'react'
import SkeletonAnimation from './SkeletonAnimation'
import { usePathname } from 'next/navigation'
import { cartContext } from '../_context/CartContext'
import CartApis from '../_utils/CartApis'
import Cart from '../_components/Cart'
import Link from 'next/link'

 function Header() {
  const {user,isLoaded} = useUser() ;
  const[showNav,setShowNav] = useState(false)
  const {cart , setCart} = useContext(cartContext)
  const [showCart, setShowCart] = useState(false)
  const path = usePathname(); 
  const[hideHeader,setHideHeader] = useState(null)
  const getCartItems = useCallback( ()=>{
    CartApis.getUserCart(user?.primaryEmailAddress?.emailAddress).then((res)=>{

      const newCart = res.data.data.map((cartItem) => ({
        id: cartItem.id,
        documentId: cartItem.documentId,
        product: cartItem.products[0],
        quantity:cartItem.quantity
      }));
      setCart(newCart);
    })
  },[user, setCart])
  useEffect(()=>{
    if (hideHeader === null) {
      if (path.toString().includes('sign-in') || path.toString().includes('sign-up')) {
       
        setHideHeader(true);
      } else {
      
         setHideHeader(false);
      }
    
   }
 
     user&& getCartItems()
    


  },[user,getCartItems])
  if(hideHeader===null){
    return null;
  }
  
  return  !hideHeader && (
    <header  className="bg-white shadow-md">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
      <div className="flex h-16 items-center justify-between">
        <Link href='/' className="md:flex md:items-center md:gap-12">
          <Image src='/logo.svg' width={40} height={40} alt="logo img"/>
        </Link>
  
        <div className="hidden md:block">
          <nav aria-label="Global">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link href='/' className="text-gray-500 transition hover:text-teal-500/75" > Home </Link>
              </li>
  
              <li>
                <Link href="/userorders" className="text-gray-500 transition hover:text-teal-500/75" > Orders </Link>
              </li>
  
  
              <li>
                <a className="text-gray-500 transition hover:text-teal-500/75 uppercase" href="#"> Faq </a>
              </li>

              
              <li>
                <Link href="/contact" className="text-gray-500 transition hover:text-teal-500/75" > Contact Us </Link>
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
                  <Link
                    className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-teal-500"
                    href="/sign-in"
                  >
                    Login
                  </Link>
        
                  <div className="hidden sm:flex">
                    <Link
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-teal-500"
                      href="/sign-up"
                    >
                      Register
                    </Link>
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
            <button 
             onClick={()=>setShowNav(!showNav)}
            className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
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

    <ResponsiveNavBar showNav={showNav} setShowNav={setShowNav} user={user} isLoaded={isLoaded} />
  </header>
  )
}

export default React.memo(Header)

const ResponsiveNavBar = React.memo(({showNav,setShowNav, user , isLoaded })=>{

  return(
    <div className={`nav-wrapper ${showNav? 'active':''} hover:cursor-pointer`}
  
    >
      <div className="nav-container flex flex-col">
        <button
        type="button"
        className="flex items-center justify-between"
        onClick={()=>setShowNav(!showNav)}
       
        >
         <Link href='/' className="md:flex md:items-center md:gap-12">
          <Image src='/logo.svg' width={40} height={40} alt="logo img"/>
        </Link>
        <CircleX className='text-primary'/>
        </button>

  
           
          <div className="flex flex-col mt-4 gap-y-6">
              <h2 className='capitalize text-slate-700 hover:text-primary ease-in-out transition-colors'>
                <Link href='/' onClick={()=>setShowNav(false)}>
                  home
                </Link>
              </h2>
              <h2 className='capitalize text-slate-700 hover:text-primary ease-in-out transition-colors'>
                <Link href='/userorders' onClick={()=>setShowNav(false)}>
                  orders
                </Link>
              </h2>
              <h2 className='capitalize text-slate-700 hover:text-primary ease-in-out transition-colors'>
                <Link href='/contact' onClick={()=>setShowNav(false)}>
                contact us
                </Link>
              </h2>
         
              <h2 className='capitalize text-slate-700 hover:text-primary ease-in-out transition-colors'>
                <Link href='' onClick={()=>setShowNav(false)}>
                FAQ
                </Link>
              </h2>
         
          
              {
                !user ?  
                  <>
                    <div className="hidden sm:flex">
                      <Link
                        className="rounded-md  bg-primary px-7 py-2.5 text-sm font-medium text-white shadow hover:bg-teal-500"
                        href="/sign-in"
                      >
                        Login
                      </Link>
                    </div>
                  
          
                    <div className="hidden sm:flex">
                      <Link
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 hover:bg-teal-500"
                        href="/sign-up"
                      >
                        Register
                      </Link>
                    </div>
                  </> 
                  :
                  <h2 className='flex items-center gap-x-2 text-sm text-primary'>
                    <UserButton/>
                    {user?.fullName}  
                  </h2>

              }

          </div>
            
          
             
    
         
      </div>
   
    </div>
  )
})
