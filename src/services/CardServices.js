export const sendPaymentInfo = async (cardInfo, authToken) => {
    const paymentURL = "http://localhost:3500/payment";
    console.log("Called!!");
    console.log("Card info: ", cardInfo);
      try {
        const response = await fetch(paymentURL,{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-type":"application/json"},
            credentials: 'include',
            body: JSON.stringify({cardInfo: cardInfo})
        });

          if (!response.ok){
            const message = response.status;
            throw new Error(message);
          }

          const data = await response.json();
        
          return data;
        } catch (error) {
          console.log(error);
          throw error;
      }
}