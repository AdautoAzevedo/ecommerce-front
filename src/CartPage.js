import React, { useEffect, useState } from 'react'
import { useAuth } from './context/AuthContext';
import { removeCartItem, viewCart, updateItemInCart } from './services/CartServices';

const CartPage = () => {
    const [cart, setCart] = useState({ total_price: 0, items: [] });
    const {authToken} = useAuth();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartReceived = await viewCart(authToken);
                setCart(cartReceived);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCart();
        console.log(cart);
    }, []);

    const handleUpdateQuantity = async (itemId, updatedQuantity) => {
        try {
            console.log("Id: ", itemId);
            console.log("Quantity: ", updatedQuantity);
            await updateItemInCart(itemId, updatedQuantity, authToken);
            const updatedCart = await viewCart(authToken);
            setCart(updatedCart);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemoveItem = async (itemId) => {
        try {
            console.log("Deletando: ", itemId);
            await removeCartItem(itemId, authToken);
            const updatedCart = await viewCart(authToken);
            setCart(updatedCart);
        } catch (error) {
            console.error(error);
        }
    }
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
        </section>
    )
}

export default CartPage