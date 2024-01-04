import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const [product, setProduct] = useState(null);
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

    const addToCart = () => {
        console.log("Added to cart: ", product);
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