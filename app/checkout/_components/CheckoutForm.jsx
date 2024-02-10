"use client"
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CartContext } from "./../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import orderApis from "../../_utils/orderApis";
import cartApis from "../../_utils/cartApis";

const CheckoutForm = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const searchParams = useSearchParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    const createOrder_ = () => {
      const productIds = [];
      cart.forEach((el) => {
        productIds.push(el?.product?.id);
      });

      const data = {
        data: {
          email: user.primaryEmailAddress.emailAddress,
          username: user.fullName,
          amount: Number(searchParams.get("amount")),
          products: productIds,
        },
      };

      orderApis.createOrder(data).then((res) => {
        if (res) {
          cart.forEach((el) => {
            cartApis.deleteCartItem(el?.id);
          });
        }
      });
    };

    createOrder_()

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(searchParams.get("amount")),
      }),
    });

    const clientSecret = await res.json();

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    const createOrder = () => {
      const productIds = [];
      cart.forEach((el) => {
        productIds.push(el?.product?.id);
      });

      const data = {
        data: {
          email: user.primaryEmailAddress.emailAddress,
          username: user.fullName,
          amount,
          products: productIds,
        },
      };

      orderApis.createOrder(data).then((res) => {
        if (res) {
          cart.forEach((el) => {
            cartApis.deleteCartItem(el?.id);
          });
        }
      });
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-32 lg:mx-[320px] mt-12 h-[77.5vh]">
        <PaymentElement />
        <button className="bg-primary p-2 text-white mt-5 rounded-md w-full">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
