import React from "react";
import ProductsCard from "./ProductsCard";

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ">
      {products?.map((product) => (
        <ProductsCard product={product} key={product.id}/>
      ))}
    </div>
  );
};

export default ProductList;
