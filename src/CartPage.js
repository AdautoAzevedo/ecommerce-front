import React, { useEffect, useState } from 'react'
import { useAuth } from './context/AuthContext';
import { removeCartItem, viewCart, updateItemInCart } from './services/CartServices';
import { sendOrderRequest } from './services/OrderServices';
import OrderComponent from './OrderComponent';
import CartItemsComponent from './components/CartItemsComponent';

const CartPage = () => {
    const [cart, setCart] = useState({ total_price: 0, items: [] });
    const [orderDetails, setOrderDetails] = useState({order_id: 0, total_price: 0, order_items: [{}] });
    const [showOrderDetails, setShowOrderDetails] = useState(false);
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
    }, []);

    const handleUpdateQuantity = async (itemId, updatedQuantity) => {
        try {
            await updateItemInCart(itemId, updatedQuantity, authToken);
            const updatedCart = await viewCart(authToken);
            setCart(updatedCart);
        } catch (error) {
            console.error(error);
        }
    }

    const handleRemoveItem = async (itemId) => {
        try {
            await removeCartItem(itemId, authToken);
            const updatedCart = await viewCart(authToken);
            setCart(updatedCart);
        } catch (error) {
            console.error(error);
        }
    }

    const handleOrderRequest = async() => {
        try {
            const orderDetails = await sendOrderRequest(authToken);
            console.log("Order details: ", orderDetails);
            setOrderDetails(orderDetails.order);
            setShowOrderDetails(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            {showOrderDetails ? (
            <OrderComponent orderDetails={orderDetails}/> 
            ) : (
            <CartItemsComponent 
                cart={cart} 
                handleUpdateQuantity={handleUpdateQuantity} 
                handleRemoveItem={handleRemoveItem} 
                handleOrderRequest={handleOrderRequest} 
            />
        )}
        </main>
    )
};

export default CartPage