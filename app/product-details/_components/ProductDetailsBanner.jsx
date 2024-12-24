
import Image from 'next/image'
import React from 'react'
import SkeletonAnimation from './SkeletonAnimation';
import { hostName } from '../../_utils/axiosClient';

function ProductDetailsBanner({product}) {
    console.log(hostName,product?.banner?.url);
  return (
    <div  >
        {
          product?.banner?.url ?
          <Image
          src={`${product?.banner?.url}`}
          alt="product-details-info"
          width={400}
          height={400}
          className='rounded-lg h-[300px] w-[100%]'
          /> 
          :
         
          <SkeletonAnimation width={'300px'} height={'300px'} />   
        }
       
     

    </div>
  )
}

export default ProductDetailsBanner