import React, { useEffect, useState } from 'react'
import { getCategoriesList } from './services/CategoriesServices';

const CategoriesSelect = ({handleCategoryChange, newCategory, handleNewCategoryInput, selectedCategory, categoryInput}) => {
    const [categories, setCategories] = useState([]);

    //Maybe add the submit button here, to fetch the categories again when it sends a new category
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesList = await getCategoriesList();
                setCategories(categoriesList);        
            } catch (error) {
                console.error(error);
            }
        }
        fetchCategories();
    }, []);

    

    if (newCategory === false) {
        return (
            <div>
                <label htmlFor='category'>Select Category:</label>
                <select name='category' value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
            </div>
        )
    } else {
        return (
            <div>
                <label>New Category: </label>
                <input 
                    type='text'
                    name='newCategory'
                    value={categoryInput}
                    onChange={handleNewCategoryInput}
                />
            </div>
        )
    } 
}

export default CategoriesSelect