export const addProduct = async(productData, authToken) => {
    const productsURL = "http://localhost:3500/products";
    console.log("Auth token: ", authToken);
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

export const addCategory = async (categoryName, authToken) => {
    console.log("Auth token: ", authToken);
    const categoriesURL = "http://localhost:3500/categories";
    try {
        console.log(categoryName);
        const response = await fetch(categoriesURL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({name: categoryName}),
        });

        if (!response.ok) {
            const message = response.status;
            throw new Error(message);
        }

        const categoryReceived = await response.json();
        console.log("Category received: ", categoryReceived);
        return categoryReceived;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
 