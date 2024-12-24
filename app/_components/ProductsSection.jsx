"use client";
import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import ProductsApi from "../_utils/ProductsApi";
import { MoveRight } from "lucide-react";

function ProductsSection() {
  const [productList, setProductList] = useState([]);
  const getProductsList_ = () => {
    ProductsApi.getProductsList().then((res) => {
      setProductList(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    getProductsList_();
  }, []);
  return (
    <div className="px-10 md:px-20">
      <div className="flex justify-between items-center">
        <h2 className="capitalize my-4 text-xl">Brand new</h2>
        <h2 className="flex items-center text-teal-300 hover:cursor-pointer">
          view collection
          <MoveRight className="mx-2" />
        </h2>
      </div>
      <ProductsList productList={productList} />
    </div>
  );
}

export default ProductsSection;
