"use client";
import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import productApis from "../_utils/productApis";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts_();
  }, []);

  const getProducts_ = () => {
    productApis.getProducts().then((res) => {
      setProducts(res.data.data);
    });
  };

  return (
    <div className="px-10 md:px-20 mb-10">
      <span class="relative flex justify-center my-10">
        <div class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-primary  to-transparent opacity-75"></div>
        <span class="relative z-10 bg-white px-6 text-6xl text-primary tracking-wide">
          ONLINE  COURSES
        </span>
      </span>
      <ProductList products={products} />
    </div>
  );
};

export default ProductSection;
