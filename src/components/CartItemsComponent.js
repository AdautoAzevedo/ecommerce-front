import React from 'react'

const CartItemsComponent = ({cart, handleUpdateQuantity, handleRemoveItem, handleOrderRequest}) => {
  return (
    <section>
            <ul>
                {cart.items.map((cartItem, index) => (
                    <li className='cartItems' key={index}> 
                        <div>
                            <p>{cartItem.product_name}</p>
                            <p>Quantity: {cartItem.quantity}</p>
                            <p>Price: ${cartItem.total_price}</p>
                            <button onClick={()=> handleUpdateQuantity(cartItem.item_id, cartItem.quantity+1)}>Increase Quantity</button>
                            <button onClick={()=> handleUpdateQuantity(cartItem.item_id, cartItem.quantity-1)}>Decrease Quantity</button>
                            <button onClick={()=> handleRemoveItem(cartItem.item_id)}>Remove item</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h3>Total price: {cart.total_price}</h3>
            <button onClick={handleOrderRequest}>Buy!</button>
        </section>
  )
}

export default CartItemsComponent