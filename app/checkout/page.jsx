"use client"
import React, { Suspense } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './_components/CheckoutForm';
import { useSearchParams } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);



const CheckOut = () => {
  
  const searchParams = useSearchParams()

  const options = {
    mode: 'payment',
    currency: 'usd',
    amount: Number(searchParams.get('amount')) || 1
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </Suspense>
  );
};

export default CheckOut;