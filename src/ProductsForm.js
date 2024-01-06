import React, { useState } from 'react'
import CategoriesSelect from './CategoriesSelect';
import { useAuth } from './context/AuthContext';
import { addProduct } from './services/ProductsServices';
import { addCategory } from './services/CategoriesServices';

const ProductsForm = () => {
    const {authToken} = useAuth();

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0); //maybe ('')
    const [newCategory, setNewCategory] = useState(false);
    const [categoryInput, setCategoryInput] = useState('');
    
    //To categories already in the form options
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    }

    //To categories received in the input.
    const handleNewCategoryInput = (event) => {
        setCategoryInput(event.target.value);
    }

    const handleNewCategoryToggle = (event) => {
        event.preventDefault();
        const showCategoryInput = newCategory ? false : true; 
        setNewCategory(showCategoryInput);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        let categoryIdToSend = selectedCategory;

        if (newCategory) {
            try {
                const categoryReceived = await addCategory(categoryInput, authToken);
                categoryIdToSend = categoryReceived.category_id;
            } catch (error) {
                console.error("Error adding the new category: ", error);
            }
        }

        const product = {
            name: productName,
            price: price,
            categoryId: categoryIdToSend
        };

        try {
            console.log("Product no ProductsForm: ", product);
            const productResponse = await addProduct(product, authToken);
            console.log("Product added successfully: ", productResponse);
            setProductName('');
            setPrice(0);
            setSelectedCategory(0);
            setCategoryInput('');
        } catch (error) {
            console.error("Error adding the new product: ", error);
        }
         
    };

  return (
    <form>
        <h1>Products Form</h1>
        <label htmlFor='name'> Product: </label>
            <input 
                type='text'
                name='name'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required    
            />
            <label htmlFor='price'> Price: </label>
            <input 
                type='number'
                name='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}    
                required
            />
            <CategoriesSelect 
                handleCategoryChange={handleCategoryChange}
                newCategory = {newCategory}
                handleNewCategoryInput = {handleNewCategoryInput}
                selectedCategory={selectedCategory}
                categoryInput ={categoryInput}
            />
            <button onClick={handleNewCategoryToggle}>Add new Category</button>
            <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default ProductsForm