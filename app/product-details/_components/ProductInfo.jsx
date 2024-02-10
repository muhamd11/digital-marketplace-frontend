"use client"
import React, {useContext} from "react";
import { List, ShoppingCart, BadgeCheck, AlertOctagon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import cartApis from "../../_utils/cartApis";
import { CartContext } from '../../_context/CartContext'

const ProductInfo = ({ product }) => {

  const { user } = useUser()
  const router = useRouter()
  const {cart,setCart} = useContext(CartContext)

  const handleAddToCart = () => {
    if (!user) {
      router.push('/sign-in')
    } else {
      const data = {
        data : {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
      }
      cartApis.addToCart(data).then((res) => {
        setCart(oldCart => [...oldCart, {
          id: res?.data?.data?.id,
          product
        }])
      }).catch((err) => {
        console.log(err)
      })
    }
  }



  return (
    <div>
      {product ? (
        <div>
          <h2 className="text-[25px]">{product?.attributes?.title}</h2>
          <h2 className="text-[18px] text-gray-400 capitalize font-medium flex gap-1 items-center">
            <List width={15} height={15} />
            {product?.attributes?.category}
          </h2>
          <p className="text-[16px] mt-5">{product?.attributes?.description}</p>
          <h2 className="flex gap-2 items-center text-[13px] mt-5 text-gray-500">
            {product?.attributes?.instantDelivery ? (
              <BadgeCheck className="w-5 h-5 text-green-500" />
            ) : (
              <AlertOctagon />
            )}
            Eligible For Instant Delivery
          </h2>
          <div className="flex justify-between items-center">
            <p className="py-5 text-[32px] text-primary">
              $ {product?.attributes?.price}
            </p>
            <button
              className="flex items-center gap-5 rounded-lg border border-primary bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-indigo-500"
              onClick={handleAddToCart}
            >
              <ShoppingCart />
              ADD TO CART
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-[350px] ">
          <div className="bg-slate-200 w-[300px] h-[30px] rounded-lg animate-pulse"></div>
          <div className="bg-slate-200 mt-3 w-[70px] h-[30px] rounded-lg animate-pulse"></div>
          <div className="bg-slate-200 mt-6 w-[700px] h-[200px] rounded-lg animate-pulse"></div>
          <div className="bg-slate-200 mt-3 w-[200px] h-[30px] rounded-lg animate-pulse"></div>
          <div className="flex item-center justify-between">
            <div className="bg-slate-200 mt-3 w-[100px] h-[40px] rounded-lg animate-pulse"></div>
            <div className="bg-slate-200 mt-3 w-[200px] h-[40px] rounded-lg animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
