import React from 'react'
import { Link } from 'react-router-dom'

const OrderComponent = ({ orderDetails }) => {

    return (
        <section>
            <h2>Please, confirme your order: </h2>
            <ul>
            {orderDetails.order_items.map((orderItem, index) => (
                <li className='orderItems' key={index}> 
                    <div>
                        <p>{orderItem.product_name}</p>
                        <p>Quantity: {orderItem.quantity}</p>
                        <p>Price: ${orderItem.total_price}</p>
                    </div>
                </li>
            ))}
            </ul>
            <Link to={"/creditcard"} className='link'>Pay with credit card</Link>
        </section>
    )
}

export default OrderComponent