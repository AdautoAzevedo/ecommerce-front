import React, { useEffect } from 'react'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PiK85JiFsZgEagpbCLIudGCMvm8nBj3ouDZ4tXAaHYoEIm9d97A8kzExLk27KTxvC5tIKcwwhAtUPJPhlc7zv6S00rgGDuHXu');

const CreditCardPage = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await fetch('http://localhost:3500/payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({amount: 1000, currency: 'usd'}),
                });

                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                setError(`Failed to create payment intent: ${error.message}`);
            }
        };

        createPaymentIntent();
    }, []);

    return (
        <form id='payment-form' onSubmit={handleSubmit}>
            <CardElement id='card-element' onChange={handleChange} />
            <button disabled={processing || disabled || succeeded} id='submit'>
                <span id='button-text'>
                    {processing ? <div className='spinner' id='spinner'></div> : "Pay" }
                </span>
            </button>
            {error && <div className='card-error' role='alert'>{error}</div>}
            <p className= {succeeded ? 'result-messae' : 'result-message hidden'} >
                Payment succeeded, see the result in your
                <a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a> Refresh the page to pay again.
            </p>
        </form>
    )
}

const StripeWrapper = () => (
    <Elements stripe={stripePromise}>
        <CreditCardPage />
    </Elements>
)

export default StripeWrapper;