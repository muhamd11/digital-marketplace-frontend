import React from "react";
import Image from "next/image";

const ProductBanner = ({ product }) => {
  return (
    <div>
      {product ? (
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          width={600}
          height={600}
          alt="Product-Banner"
          className="rounded-lg w-[650px] h-[400px] "
        />
      ) : (
        <div className="max-w-[650px] h-[400px] bg-slate-200 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
};

export default ProductBanner;
