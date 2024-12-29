'use client'
import { Minus, Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'

function Counter({quantity = 1 , handleQuantityDetials ,handleCartItemQuantity}) {
 
    const[counter,setCounter]= useState(quantity)
    useEffect(() => {
        setCounter(quantity); 
      }, [quantity]);
    useEffect(()=>{
        if (handleQuantityDetials && counter !== quantity) {
            handleQuantityDetials(counter);
        }
       
    },[counter])
    useEffect(()=>{
        if (handleCartItemQuantity && counter !== quantity) {
            handleCartItemQuantity(counter);
        }
    
    },[counter])

    if(counter < 1){
        setCounter(1)
    }
    const handleAddQuantity = (e)=>{
        e.stopPropagation()
        setCounter(counter+1)
      
    }
    const handleMinQuantity = (e)=>{
        e.stopPropagation()
        setCounter(counter-1)
    }
  return (
    <span className='flex items-center  '> 
        <button onClick={handleMinQuantity} className=' cursor-pointer bg-teal-300 p-2 '>
            <Minus className='w-4 h-4 text-white '/>
        </button>
        <span className='bg-gray-200 py-1 px-3' >{counter}</span>
        <button className='cursor-pointer bg-teal-300 p-2 ' 
            onClick={handleAddQuantity}>
            <Plus className='w-4 h-4 text-white '/>
        </button>
        
    </span>
  )
}

export default Counter