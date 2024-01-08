export const addProduct = async(productData, authToken) => {
    const productsURL = "http://localhost:3500/products";
    console.log("Product data at addProduct: ", productData);
    try {
        const response = await fetch(productsURL,{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-type":"application/json"},
            credentials: 'include',
            body: JSON.stringify(productData)
        });
        console.log(response);
        if (!response.ok){
            const message = response.status;
            throw new Error(message);
        }
        const productReceived = await response.json();
        console.log(productReceived);
        console.log("Deu certo");
        return productReceived;
    } catch (error) {
        console.error("Error aqui: ", error);
        throw error;
    }
}

export const addProductToCart = async(productId, authToken) => {
    const cartURL = "http://localhost:3500/cart";
    console.log("AuthToken: ", authToken);
    console.log("productId: ", productId);
    try {
        const response = await fetch(cartURL,{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-type":"application/json"},
            credentials: 'include',
            body: JSON.stringify({productId: productId})
        });
        console.log(response);
        if (!response.ok){
            const message = response.status;
            throw new Error(message);
        }
        
        return "Item added";
    } catch (error) {
        console.error("Error aqui: ", error);
        throw error;
    }
}
 
export const viewCart = async( authToken) => {
    const cartURL = "http://localhost:3500/cart";
    console.log("AuthToken: ", authToken);
    try {
        const response = await fetch(cartURL,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
            credentials: 'include',
        });
        console.log(response);
        if (!response.ok){
            const message = response.status;
            throw new Error(message);
        }
        const cart = await response.json();
        return cart;
    } catch (error) {
        console.error("Error aqui: ", error);
        throw error;
    }
}
 
