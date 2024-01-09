//TRY TO DECLARE THE URL HERE
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

export const removeCartItem = async(itemId, authToken) => {
    const cartURL = "http://localhost:3500/cart/"+`${itemId}`;
    console.log("AuthToken: ", authToken);
    try {
        const response = await fetch(cartURL,{
            method: "DELETE",
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
        console.log("DELETED!!!");
    } catch (error) {
        console.error("Error aqui: ", error);
        throw error;
    }
}

export const updateItemInCart = async(itemId, quantity, authToken) => {
    const cartURL = "http://localhost:3500/cart/" + `${itemId}`;
    try {
        const response = await fetch(cartURL,{
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-type":"application/json"},
            credentials: 'include',
            body: JSON.stringify({quantity: quantity})
        });
        console.log(response);
        if (!response.ok){
            const message = response.status;
            throw new Error(message);
        }
        
        return "Item updated";
    } catch (error) {
        console.error("Error aqui: ", error);
        throw error;
    }
}