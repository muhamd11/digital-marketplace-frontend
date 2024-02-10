"use client"
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useRouter } from "next/navigation"; 


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const CheckOut = () => {
  const router = useRouter(); 

  const options = {
    mode: "payment",
    currency: "usd",
    amount: Number(router.query.amount) || 1,
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm options={options} />
    </Elements>
  );
};

export default CheckOut;