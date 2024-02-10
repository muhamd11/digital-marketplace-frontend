import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useRouter } from "next/router"; 


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const CheckOut = () => {
  const router = useRouter(); // Use useRouter to access the search parameters
  const searchParams = new URLSearchParams(router.asPath);
  const options = {
    mode: "payment",
    currency: "usd",
    amount: Number(searchParams.get("amount")) || 1,
  };

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm options={options} />{" "}
      {/* Pass options as props to CheckoutForm */}
    </Elements>
  );
};

export default CheckOut;