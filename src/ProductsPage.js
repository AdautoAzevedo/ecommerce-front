import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductList();
      }, []);

    const getProductList = async() => {
        const productURL = "http://localhost:3500/products";
        try {
            const response = await fetch(productURL, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });

            if (!response.ok) {
                console.log("Error in the response")
            }

            const productsList = await response.json();
            setProducts(productsList);
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <main>
        <ul>
            {products.map((product) => (
                <li className='products' key={product.product_id}>
                    <Link to={`/products/${product.product_id}`}>
                        <h4>{product.product_name}</h4>
                        <p>{product.product_price}</p>
                    </Link>
                </li>
            ))}
        </ul>
        <button onClick={getProductList}> Get products </button>
    </main>
  )
}

export default ProductsPage