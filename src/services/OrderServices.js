export const sendOrderRequest = async (authToken) => {
    const orderURL = "http://localhost:3500/order";

    try {
        const response = await fetch(orderURL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
            credentials: 'include',
        });
        if (!response.ok){
            const message = response.status;
            throw new Error(message);
        }

        const orderDetails = await response.json();
        return orderDetails;
    } catch (error) {
        console.error(error);
    }
}