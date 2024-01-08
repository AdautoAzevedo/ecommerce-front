import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { addProductToCart, viewCart } from './services/ProductsServices';
import { useAuth } from './context/AuthContext';

const ProductDetailsPage = () => {
    const [product, setProduct] = useState(null);
    const {authToken} = useAuth();
    const params = useParams();
    
    useEffect(() => {
        const getProductDetails = async () => {
            console.log(params);
            const productId = params.id;
            const productURL = `http://localhost:3500/products/product/${productId}`;

            try {
                const response = await fetch(productURL, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                });

                if (!response.ok) {
                    console.log('Error in the response');
                }

                const productDetails = await response.json();
                setProduct(productDetails);
            } catch (error) {
                console.error(error);
            }
        };

        getProductDetails();
    }, []);

    const addToCart = async () => {
        console.log("AuthToken no component: ", authToken);
        console.log( await addProductToCart(product.product_id, authToken));
        const cartContents = await viewCart(authToken);
        console.log("CART CONTENTS: ", cartContents);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <h2>{product.product_name}</h2>
            <p>{product.product_price}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </main>
    )
}

export default ProductDetailsPage