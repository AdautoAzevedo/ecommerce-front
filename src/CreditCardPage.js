import React from 'react'
import { useState } from 'react'
import { useAuth } from './context/AuthContext';
import { sendPaymentInfo } from './services/CardServices';

const CreditCardPage = () => {

    const {authToken} = useAuth();

    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cvv, setCVV] = useState('');

    const handleCardInfoSubmit = async (event) => {
        event.preventDefault();

        const cardInfo = {
            cardNumber,
            expirationDate,
            cardholderName,
            cvv,
        };

        const response = await sendPaymentInfo(cardInfo, authToken);
        console.log(response);
    }

    return (
        <section>
            <form>
                <label htmlFor='cardNumber'> Card Number: </label>
                <input 
                    type='text'
                    name='cardNumber'
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}    
                />
                <label htmlFor='expirationDate'> Expiration Date: </label>
                <input 
                    type='text'
                    name='expirationDate'
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}    
                />
                <label htmlFor='cardHolderName'> Cardholder Name: </label>
                <input 
                    type='text'
                    name='cardHolderName'
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}    
                />
                <label htmlFor='cvv'> CVV: </label>
                <input 
                    type='text'
                    name='cvv'
                    value={cvv}
                    onChange={(e) => setCVV(e.target.value)}    
                />
            </form>
            <button onClick={handleCardInfoSubmit}>Submit</button>
        </section>
    )
}

export default CreditCardPage