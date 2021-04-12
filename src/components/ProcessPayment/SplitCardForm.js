import React, { useMemo, useState } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";


const useOptions = () => {
    
    const fontSize = '16px';
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};

           
const SplitCardForm = ({handlePaymentSuccess}) => {
    const [paymentError, setPaymentError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });

        if(payload.error){
            setPaymentSuccess('')
            setPaymentError(payload.error.message);
        }
        else{
            setPaymentError('');
            if(payload.paymentMethod){
                setPaymentSuccess(payload.paymentMethod.id);
                handlePaymentSuccess(payload.paymentMethod.id);
            }
            else {
                setPaymentSuccess('');
                console.log(payload);
            }
        }
        
    };

    return (
        <div>
            {
                paymentError && <p style={{color: 'red'}}>{paymentError}</p>
            }
            {
                paymentSuccess && <p style={{color: 'green'}}>"Your Payment was Successful!"</p>
            }
        <form onSubmit={handleSubmit}>
            <label>
                Card number
        <CardNumberElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <br />
            <label>
                Expiration date
        <CardExpiryElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <label className="p-4">
                CVC
        <CardCvcElement
                    options={options}
                    onReady={() => {
                        console.log("CardNumberElement [ready]");
                    }}
                    onChange={event => {
                        console.log("CardNumberElement [change]", event);
                    }}
                    onBlur={() => {
                        console.log("CardNumberElement [blur]");
                    }}
                    onFocus={() => {
                        console.log("CardNumberElement [focus]");
                    }}
                />
            </label>
            <br />
            <button type="submit" disabled={!stripe}>
                Pay Now
      </button>
        </form>
        </div>
        
    );
};

export default SplitCardForm;
