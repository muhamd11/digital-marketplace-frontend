import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import  Link  from 'next/link';


const Cart = ({isCartOpen}) => {
  const { cart, setCart } = useContext(CartContext);

  return isCartOpen && (
    <div className="absolute right-10 overflow-auto p-5 shadow-sm border rounded-md z-20 mx-10 top-14 bg-gray-100 w-[300px] h-[350px]">
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart?.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <img
                src={item?.product?.attributes?.banner?.data?.attributes?.url}
                alt="Item Image"
                className="size-16 rounded object-cover"
              />
              <div>
                <h3 className="text-sm text-gray-900">
                  {item?.product?.attributes?.title}
                </h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Category:</dt>
                    <dd className="inline">
                      {item?.product?.attributes?.category}
                    </dd>
                  </div>

                  <div>
                    <dt className="inline">Price:</dt>
                    <dd className="inline">
                      {item?.product?.attributes?.price}
                    </dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-4 text-center">
          <Link
            href="/cart"
            className="block rounded border bg-gray-700 border-gray-600 px-5 py-3 text-sm text-gray-100 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart ({cart?.length || 0})
          </Link>
          <a
            href="#"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
