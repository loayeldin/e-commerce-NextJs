
import Image from 'next/image'
import React from 'react'
import SkeletonAnimation from '../../_components/SkeletonAnimation';


function ProductDetailsBanner({product}) {
  return (
    <div className='w-[100%]  flex justify-center' >
        {
          product?.banner?.url ?
          <Image
          src={`${product?.banner?.url}`}
          alt="product-details-info"
          width={400}
          height={400}
          className='rounded-lg object-contain '
          /> 
          :
         
          <SkeletonAnimation width={'400px'} height={'500px'} />   
        }
       
     

    </div>
  )
}

export default React.memo(ProductDetailsBanner)