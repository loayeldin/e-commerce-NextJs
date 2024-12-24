"use client"
import React, { useEffect, useState } from 'react'
import ProductsApi from '../../_utils/ProductsApi'
import BreadCrumb from '../../_components/BreadCrumb'
import ProductDetailsBanner from '../_components/ProductDetailsBanner'
import ProductDetailsInfo from '../_components/ProductDetailsInfo'
import ProductsList from '../../_components/ProductsList'
import { usePathname } from 'next/navigation'
 function ProductDetails({params}) {
    const [productDetails,setProductDetails] = useState({})
    const [similarProducts, setSimilarProducts] = useState([])
    const [productId,setProductId] = useState(null)
    const path = usePathname()


    async function fetchParams(){
        const resolvedParams = await params
        console.log('params.....' , params);
        setProductId(resolvedParams.productId) 
    }
    
    const getProductDetails_ = ()=>{
        console.log("from details : " , productId);
        ProductsApi.getProductById(productId).then(res=>{
        
            setProductDetails(res.data)
          
            getSimilarProducts_(res.data.data.category)
        })
    }
    const getSimilarProducts_= (category)=>{
        console.log("cat from similar", category);
        ProductsApi.getSimilarProductsByCat(category).then(res=>{
            setSimilarProducts(res?.data?.data)
            console.log('similar...',res.data.data);
        })
    }
   
    useEffect(()=>{
        fetchParams()
        if(productId){
            getProductDetails_()
          
        }
   
    },[productId])

        
   
    return (
    <div className='px-2 py-8 md:px-28 '>
        
        {/* {
            productDetails.data && 
            <> */}
                <BreadCrumb path={path} id={productDetails?.data?.id}/>
                <div className='mt-10 grid grid-cols-12 gap-y-3 sm:gap-x-0 md:gap-x-16'>
                    <div className='col-span-12 md:col-span-5 flex items-center '>
                        <ProductDetailsBanner product={productDetails.data}  />
                    </div>
                    <div className='col-span-12 md:col-span-7  '>
                        <ProductDetailsInfo product={productDetails.data}  />
                    </div>
                
                </div>
            {/* </>
            
        } */}
        <div>
            <h2 className='mt-24 capitalize text-2xl mb-5 text-teal-500'>similar products</h2>
            <ProductsList productList={similarProducts}/>
        </div>
        {productId}
    </div>
  )
}
export default ProductDetails