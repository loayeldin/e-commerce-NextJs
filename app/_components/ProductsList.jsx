"use client";
import React, { useMemo } from "react";
import ProductItem from './ProductItem';

import {Card, Skeleton} from "@nextui-org/react";


function ProductsList({products}) {

const skeletonArray  = Array.from({length:8})
  return (
    <div className='grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>

      {
        products.data ? 
        
        
        products.data.map(item=>(
          <ProductItem item={item} key={item.id} />
        
        )) :
       
          skeletonArray.map((_,index)=>(
            <SkeltonCard key={index}/>
          ))
        
      
      }
    </div>
  )
}

export default React.memo(ProductsList)


const SkeltonCard= React.memo(()=>{
  return (
    <Card className="space-y-5 p-4 min-h-32" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
})
//  function SkeltonCard() {
//   return (
//     <Card className="space-y-5 p-4 min-h-32" radius="lg">
//       <Skeleton className="rounded-lg">
//         <div className="h-24 rounded-lg bg-default-300" />
//       </Skeleton>
//       <div className="space-y-3">
//         <Skeleton className="w-3/5 rounded-lg">
//           <div className="h-3 w-3/5 rounded-lg bg-default-200" />
//         </Skeleton>
//         <Skeleton className="w-4/5 rounded-lg">
//           <div className="h-3 w-4/5 rounded-lg bg-default-200" />
//         </Skeleton>
//         <Skeleton className="w-2/5 rounded-lg">
//           <div className="h-3 w-2/5 rounded-lg bg-default-300" />
//         </Skeleton>
//       </div>
//     </Card>
//   );
// }