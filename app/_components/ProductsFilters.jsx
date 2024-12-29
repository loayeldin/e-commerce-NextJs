'use client'
import React, { useContext, useEffect, useState } from 'react'
import ProductsApi from '../_utils/ProductsApi';
import {Input} from "@nextui-org/react";
import {Autocomplete, AutocompleteItem,Slider} from "@nextui-org/react";

function ProductsFilters({handleSelectedCatgory,handleSearchInput,handlePriceRange}) {
 
   const [categories , setCategories] = useState()



  useEffect(()=>{
    ProductsApi.getAllCtagories().then((res)=>{
      console.log(console.log(res, ' categories'));
      const uniqueCategories = [...new Set(res.data.data.map(product => product.category))];
      console.log(uniqueCategories);
      setCategories(uniqueCategories)
      console.log(categories , setCategories , '............');
     
    })
  },[])
  return (
    //grid grid-cols-3 flex-wrap 
    // <div className=' py-4 flex gap-x-5 mb-4 flex-wrap shrink-1  gap-y-3'>
    <div className=' py-4 mb-4 flex gap-y-2 gap-x-4 justify-start xl:justify-between flex-wrap '>
         <Input
        isClearable
        //max-w-xs
       className='md:w-[220px]  search-input'
        classNames={{
          clearButton:"text-[#35c0be]",
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
           
           
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        label="Search"
        placeholder="Type to search..."
        radius="lg"
        startContent={
          <SearchIcon className=" mb-0.5  text-[#35c0be] pointer-events-none flex-shrink-0" />
        }
        onValueChange={(value)=>{handleSearchInput(value)}}
      />


      
    
      <Autocomplete
      className="md:w-[220px] custom-autocomplete shadow-xl "
      // defaultSelectedKey="women's clothing"
      label="filter by category"
      placeholder="Category"
      scrollShadowProps={{
        isEnabled: false,
      }}
     
      classNames={{
       
        selectorButton: "text-teal-500 ",
        clearButton:"text-teal-500 "
      }}
      listboxProps={{
       
        itemClasses: {
          base: [
            
            "text-default-500",
            "data-[hover=true]:bg-default-200",
            "data-[focus-visible=true]:bg-default-200",
            "data-[pressed=true]:opacity-70",
            "data-[selected=true]:bg-teal-500  ",
            "data-[selected=true]:text-white",      
            "data-[selectable=true]:focus:none",
          ],
        },
      }}
      // popoverProps={{
      
      //   classNames: {
      //     base: ["rounded-large shadow-xl ",
        
      //   ],
      //     content: "p-2 border-small border-teal-500 ",
      //   },
      // }}
      // popoverContentProps={{
      //   classNames: {
      //     base: ["rounded-large ",
        
      //   ],
      //     content: "p-5 border-small border-green",
      //   },
      // }}
      onSelectionChange = {(key)=>{handleSelectedCatgory(key)}}
    >
      {
        categories&& categories.map((cat)=>(
          <AutocompleteItem key={cat} >
            {cat}
          </AutocompleteItem>
        ))
      }
     </Autocomplete>
   
   

     <Slider
      className="md:w-[280px]"
      classNames={{
        base: "max-w-md",
        filler: "bg-gradient-to-r from-primary to-secondary-400",
        labelWrapper: "mb-2",
        label: "font-medium text-default-700 text-medium",
        value: "font-medium text-default-500 text-small",
        thumb: [
          "after:h-3 after:w-3",
          "transition-size",
          "bg-gradient-to-r from-secondary-400 to-primary",
          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
          "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-5 data-[dragging=true]:after:w-5",
        ],
        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
      }}
      defaultValue={[0, 1000]}
      formatOptions={{style: "currency", currency: "USD"}}
      label="Price Range"
      maxValue={1000}
      minValue={0}
      showTooltip={true}
      onChangeEnd={(value)=>handlePriceRange(value)}
    />
   
    </div>

   
  )
}


const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
export default ProductsFilters