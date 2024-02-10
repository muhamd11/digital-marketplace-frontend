import React from "react";
import Image from "next/image";
import { List } from "lucide-react";
import Link from 'next/link'

const ProductsCard = ({ product }) => {
  return (
    <Link
      href={`/product-details/${product?.id}`}
      key={product.id}
      className="rounded-lg p-1 border-primary hover:cursor-pointer hover:border hover:shadow-md "
    >
      <Image
        src={product?.attributes?.banner?.data?.attributes?.url}
        width={400}
        height={350}
        alt={product?.attributes?.title}
        className="rounded-t-lg h-[250px] w-full object-cover"
      />
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-b-lg h-28 lg:h-24">
        <div className="pt-4">
          <h2 className="text-base font-medium">
            {product?.attributes?.title}
          </h2>
          <h2 className="text-sm text-gray-400 font-medium flex gap-1 items-center">
            <List width={15} height={15} />
            {product?.attributes?.category}
          </h2>
        </div>
        <p>{product?.attributes?.price}$</p>
      </div>
    </Link>
  );
};

export default ProductsCard;
