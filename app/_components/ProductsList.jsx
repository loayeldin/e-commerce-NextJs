"use client";
import React from "react";
import ProductItem from './ProductItem';



function ProductsList({products}) {


  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>

      {
       products.data&& products.data.map(item=>(
          <ProductItem item={item} key={item.id} />
        
        ))
      }
    </div>
  )
}

export default ProductsList



