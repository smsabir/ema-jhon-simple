import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const [shippingData, setShippingData] = useState(null);
    const onSubmit = data => {
        setShippingData(data);
        console.log("Form submit", data);
        
    };

    const handlePaymentSuccess = paymentId => {
        const savedCart = getDatabaseCart();
        const orderDetails = { 
            ...loggedInUser, 
            products: savedCart, 
            shipment: shippingData,
            paymentId, 
            orderTime: new Date() };

        fetch('http://boiling-woodland-07762.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    // alert('Your order placed successfully');
                }
            })
    }

    return (
        <div className="row">
            <div className="com-md-6" style={{display: shippingData ? 'none' : 'block'}}>
                < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
                    < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
                    {errors.name && <span className="error">Name is required</span>}
                    < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
                    {errors.email && <span className="error">Email is required</span>}
                    < input name="address" ref={register({ required: true })} placeholder="Your Address" />
                    {errors.address && <span className="error">Address is required</span>}
                    < input name="phone" ref={register({ required: true })} placeholder="Your Phone No" />
                    {errors.phone && <span className="error">Phone is required</span>}

                    <input type="submit" />
                </form >
            </div>
            <div className="com-md-6 p-5" className="com-md-6 p-5" style={{display: shippingData ? 'block' : 'none'}}>
                <h2>Please make the payment:</h2>
                <ProcessPayment handlePaymentSuccess={handlePaymentSuccess}></ProcessPayment>
            </div>
        </div>
    );
};

export default Shipment;