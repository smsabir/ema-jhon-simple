import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51IemZlBF7KFJDK9q5FoNJZK3UgjOr0EdgM3ERQWn8339prAMMRt1ybkbnZOGm1lliG6UI18l2UQOtMX4gGcOOj1m00Ny1mVuwx');

const ProcessPayment = ({handlePaymentSuccess}) => {
    return (
        <Elements stripe={stripePromise}>
            <SplitCardForm handlePaymentSuccess={handlePaymentSuccess}></SplitCardForm>
        </Elements>
    );
};

export default ProcessPayment;