"use client";
import BreadCrumb from "../../_components/BreadCrumb";
import productApis from "../../_utils/productApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "../_components/ProductBanner";
import ProductInfo from "../_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";

const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [productList, setProductList] = useState(null);
  const path = usePathname();

  useEffect(() => {
    getProductById_();
  }, [params?.productId]);

  const getProductById_ = () => {
    productApis.getProductById(params?.productId).then((res) => {
      setProduct(res.data.data);
      getProductByCategory_(res.data.data);
    });
  };

  const getProductByCategory_ = (product) => {
    productApis
      .getProductByCategory(product?.attributes?.category)
      .then((res) => {
        setProductList(res.data.data);
      });
  };

  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path} />
      <div className="grid gap-5 lg:grid-0 grid-cols-1 lg:grid-cols-2 py-8">
        <ProductBanner product={product} />
        <ProductInfo product={product} />
      </div>
      <div>
        <span className="relative flex justify-center my-10">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-primary  to-transparent opacity-75"></div>
          <span className="relative z-10 bg-white px-6 text-2xl text-primary tracking-wide">
            SIMILAR PRODUCTS
          </span>
        </span>
        <ProductList products={productList} />
      </div>
    </div>
  );
};

export default ProductDetails;
