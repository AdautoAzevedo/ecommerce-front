import React, { useEffect, useState } from 'react'

const CategoriesSelect = ({onCategoryChange, newCategory,categoryInput, setCategoryInput}) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const categoriesURL = "http://localhost:3500/categories";
        const fetchData = async() => {
            try {
                console.log("called");
                const response = await fetch(categoriesURL, {
                    method: "GET"
                });
                if (!response.ok){
                    const message = response.status;
                    throw new Error(message);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleCategoryChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        onCategoryChange({ target: { name: 'categoryId', value: selectedValue}});
    };

    const handleNewCategoryInputChange = (event) => {
        const {value} = event.target;
        setInputValue(value);
        setCategoryInput(value);
    }
    if (newCategory === false) {
        return (
            <div>
                <label htmlFor='category'>Select Category:</label>
                <select name='category' value={selectedCategory} onChange={handleCategoryChange}>
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
                    onChange={handleNewCategoryInputChange}
                />
            </div>
        )
    }
    
}

export default CategoriesSelect