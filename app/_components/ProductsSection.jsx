'use client'
import React ,{useState, useContext, useEffect,useCallback,useMemo}from "react";
import ProductsList from "./ProductsList";

import { productsContext } from "../_context/ProductsContext";
import ProductsApi from "../_utils/ProductsApi";
import { Dropdown } from 'primereact/dropdown';

import { MoveRight } from "lucide-react";
import ProductsFilters from './ProductsFilters'
import { Paginator } from 'primereact/paginator';
function ProductsSection() {
  const [selectedCategory , setSelectedCategory] = useState('')
  const [searchInput , setSearchInput] = useState(null)
  const [priceRange , setPriceRange]= useState([])
  const {products, setProducts} = useContext(productsContext)


  const handlePriceRange = useCallback((newRange)=>{
    setPriceRange(newRange)
  },[])
  const handleSearchInput = useCallback((searchText)=>{
    setSearchInput(searchText)
  },[])
  const handleSelectedCatgory = (newCat)=>{
    setSelectedCategory(newCat)
  
  }


  // pagination functions
  const [first, setFirst] = useState([0, 0, 0]);
  const [rows, setRows] = useState([8, 8, 8]);
  const template2 =useMemo(()=>( {
    layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
    RowsPerPageDropdown: (options) => {
        const dropdownOptions = [
            { label: 8, value: 8 },
            { label: 12, value: 12 },
            { label: 15, value: 15 },
            { label: 20, value: 20 }
        ];

        return (
            <React.Fragment>
                <span className="md:mr-1 text-[12px] md:text-[14px]" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Items per page:{' '}
                </span>
                <Dropdown className="pagination-dropdown  border border-primary " value={options.value} options={dropdownOptions} onChange={options.onChange} />
            </React.Fragment>
        );
    },
    CurrentPageReport: (options) => {
        return (
            <span className="text-[12px] md:text-[14px] " style={{ color: 'var(--text-color)', userSelect: 'none', width: '80px', textAlign: 'center' }}>
                {options.first} - {options.last} of {options.totalRecords}
            </span>
        );
    }
  }));

  const onPaginationChange = (e, index) => {

  setFirst(first.map((f, i) => (index === i ? e.first : f)));
  setRows(rows.map((r, i) => (index === i ? e.rows : r)));
  };

  const getProductsList_ = useCallback((
   
    pagination
   ) => {
 
    ProductsApi.getProductsList(
      selectedCategory,
      searchInput,
      priceRange,
      pagination,
      )
      .then((res) => {
     
      setProducts(res.data);
  
    
    });
},[selectedCategory, searchInput, priceRange,first,rows])
  useEffect(() => {
    getProductsList_(

      {pageStart:first[1],pageLimit:rows[1]}
      );

 
  
   


  }, [selectedCategory,searchInput,priceRange,first,rows ]);








 












  return (
    <div className="px-4 md:px-14 mb-9 mt-8">

      <div className="flex justify-between items-center">
        <h2 className="capitalize my-4 text-xl">Trending Products</h2>
        <h2 className="flex items-center text-teal-300 hover:cursor-pointer">
          view collection
          <MoveRight className="mx-2" />
        </h2>
      </div>
    

    {
      products.data && 
      <>
        





        <div className="flex items-center justify-between gap-x-7 flex-wrap md:flex-nowrap ">
          
          <div className="">
            <ProductsFilters 
              handleSelectedCatgory={handleSelectedCatgory} 
              handleSearchInput={handleSearchInput}
              handlePriceRange={handlePriceRange}
              />

          </div>
          <div className="md:min-w-[354px] ">
            <Paginator 
              template={template2} 
              first={first[1]} 
              rows={rows[1]}
              totalRecords={products?.meta?.pagination?.total}
              onPageChange={(e) => onPaginationChange(e, 1)} 
                className="paginator justify-content-end flex-nowrap " 
              />
          </div>
        </div>

        
       
      </>
    }

        <ProductsList
        products={products}
          />
 

    </div>
  );
}

export default React.memo(ProductsSection);