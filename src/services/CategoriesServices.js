export const getCategoriesList = async () => {
    const categoriesURL = "http://localhost:3500/categories";
    try {
        console.log("called");
        const response = await fetch(categoriesURL, {
            method: "GET"
        });
        if (!response.ok){
            const message = response.status;
            throw new Error(message);
        }
        const categoriesList = await response.json();
        return categoriesList;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addCategory = async (categoryName, authToken) => {
    console.log("Auth token: ", authToken);
    const categoriesURL = "http://localhost:3500/categories";
    try {
        console.log("Sent category name: ", categoryName);
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
};

