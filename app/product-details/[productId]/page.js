"use client"
import React, { useEffect, useState,useCallback } from 'react'
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



    const fetchParams = useCallback(async()=>{
        const resolvedParams = await params
      
        setProductId(resolvedParams.productId) 
    },[params])
    
    const getProductDetails_ = useCallback(()=>{
     
        ProductsApi.getProductById(productId).then(res=>{
         
            setProductDetails(res.data)
          
            getSimilarProducts_(res.data.data.category)
        })
    },[productId])
    const getSimilarProducts_= useCallback((category)=>{
     
        ProductsApi.getSimilarProductsByCat(category).then(res=>{
            setSimilarProducts(res?.data)
         
        })
    },[])
   
    useEffect(() => {
        fetchParams(); // Set productId based on params
      }, [params]);
    
      useEffect(() => {
        if (productId) {
          getProductDetails_();
        }
      }, [productId, getProductDetails_]);

        
   
    return (
    <div className='px-2 py-8 md:px-5 lg:px-28 '>
        
        {/* {
            productDetails.data && 
            <> */}
                <BreadCrumb path={path} id={productDetails?.data?.id} />
                <div className='py-8 px-2  grid grid-cols-12 gap-y-3 sm:gap-x-0 md:gap-x-16  rounded-lg' style={{boxShadow:'0 2px 10px #0000001a'}}>
                    <div className='col-span-12 md:col-span-5 py-2 '>
                        <ProductDetailsBanner product={productDetails.data}  />
                    </div>
                    <div className='col-span-12 md:col-span-7 py-2 '>
                        <ProductDetailsInfo product={productDetails.data}  />
                    </div>
                
                </div>
            {/* </>
            
        } */}
        <div>
            <h2 className='mt-24 capitalize text-2xl mb-5 text-teal-500'>similar products</h2>
            <ProductsList products={similarProducts}/>
        </div>
    
    </div>
  )
}
export default React.memo(ProductDetails)