
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { hostName } from "../../_utils/axiosClient";
import { useContext } from "react";
import { cartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import OrderApi from'../../_utils/OrderApi'
import CartApis from "../../_utils/CartApis";

const CheckoutForm = ({amount}) => {
  
    const {cart,setCart} = useContext(cartContext)
    const {user} = useUser()
    const form = document.getElementById('payment-form');
    const submitBtn = document.getElementById('submit');
  const stripe = useStripe();
  const elements = useElements();

  const createOrder=()=>{
  
    let productsDocumentId = [];
    cart.forEach(el=>{
        productsDocumentId.push(el?.product?.documentId )
    })
    console.log('checkout productsDocumentId.....',productsDocumentId);
    const data= {
        data:{
            email:user.primaryEmailAddress.emailAddress,
            amount:amount,
            username:user.fullName,
            products:productsDocumentId

        }
    }
    console.log(data);
    OrderApi.addOrder(data).then((res)=>{
        console.log(res);
        if(res){
            cart.forEach(el=>{
                CartApis.deleteCartItem(el?.documentId).then(result=>{

                })
            })
          
        }
    })
  }
  const sendEmail = async()=>{
    const res = await fetch("api/send-email", {
        method: "POST",
        body: JSON.stringify({
          amount: amount,
          email: user.primaryEmailAddress.emailAddress,
          fullName: user.fullName,
          cart:cart
        })
    })
  }


  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const handleError = (error) => {
        const messageContainer = document.querySelector('#error-message');
        messageContainer.textContent = error.message;
        submitBtn.disabled = false;
      }
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("api/create-intent", {
    
      method: "POST",
      body: JSON.stringify({
        amount: amount,
        // amount:Math.round(amount * 100)
      }),
    });
    const clientSecret = await res.json();

    createOrder();
    sendEmail();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/checkout/payment-confirm',
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
  };
  
  return (
    <form onSubmit={handleSubmit}>
      
      <div className="w-full md:w-[650px] mx-auto mt-12">
        <div>
            <h2>card number text: 4242 4242 4242 4242</h2>
            <h2>card expir text: 12 / 45 </h2>
            <h2>card sec code: 335</h2>
        </div>
        <PaymentElement />
        <button className="mt-2 bg-primary text-white rounded-lg p-2 w-full">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
