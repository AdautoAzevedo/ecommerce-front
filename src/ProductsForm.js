import React, { useState } from 'react'
import CategoriesSelect from './CategoriesSelect';
import { useAuth } from './context/AuthContext';
import { addCategory, addProduct } from './services/ProductsServices';

const ProductsForm = () => {
    const {authToken, setToken} = useAuth();

    const [product, setProduct] = useState({
        name: '',
        price: 0,
        categoryId: 0,
    });

    const [newCategory, setNewCategory] = useState(false);
    const [categoryInput, setCategoryInput] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({
            ...product,
            [name]: value
        });
        console.log(product);
    }

    const handleCategoryChange = (event) => {
        setProduct({...product, categoryId: event.target.value});
    };
    const handleNewCategoryToggle = (event) => {
        event.preventDefault();
        setNewCategory(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Storing...");
        try {
            if (newCategory && categoryInput.trim() !== '') {
                await addCategory(categoryInput, authToken);
            }
            await addProduct(product, authToken);
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <form>
        <h1>Products Form</h1>
        <label htmlFor='name'> Product: </label>
            <input 
                type='text'
                name='name'
                value={product.name}
                onChange={handleChange}    
            />
            <label htmlFor='price'> Price: </label>
            <input 
                type='number'
                name='price'
                value={product.price}
                onChange={handleChange}    
            />
            <CategoriesSelect 
                onCategoryChange={handleCategoryChange}
                newCategory = {newCategory}
                categoryInput = {categoryInput}
                setCategoryInput = {setCategoryInput}
            />
            <button onClick={handleNewCategoryToggle}>Add new Category</button>
            <button onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default ProductsForm