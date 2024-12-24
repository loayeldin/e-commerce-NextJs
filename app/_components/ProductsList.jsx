import React from 'react'
import ProductItem from './ProductItem';

function ProductsList({productList}) {
  console.log(productList);
  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

      {
        productList.map(item=>(
          <ProductItem item={item} key={item.id}/>
        
        ))
      }
    </div>
  )
}

export default ProductsList