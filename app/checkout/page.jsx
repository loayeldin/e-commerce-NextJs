// 'use client'
// import React, { Suspense } from 'react';
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import CheckoutForm from './_components/CheckoutForm';
// import { useSearchParams } from 'next/navigation';
// function Checkout() {
//     const searchParams = useSearchParams()
   
//     const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

//     const amount = Math.round(Number(searchParams.get('amount')) * 100)
//     const options = {
//        mode:'payment',
//        currency:'usd',
   
//         amount:amount
  
//       };
//     return (
//         <Elements stripe={stripePromise} options={options}>
//           <CheckoutForm amount={amount} />
//         </Elements>
//       );
// }

// export default Checkout

'use client';

import React, { Suspense } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import { useSearchParams } from 'next/navigation';

function Checkout() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

  const RenderCheckout = () => {
    const searchParams = useSearchParams();
    const amount = Math.round(Number(searchParams.get('amount')) * 100);

    const options = {
      mode: 'payment',
      currency: 'usd',
      amount: amount,
    };

    return (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={amount} />
      </Elements>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderCheckout />
    </Suspense>
  );
}

export default Checkout;