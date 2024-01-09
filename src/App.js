import {useState} from 'react'
import './App.css';
import Form from './Form';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProductsForm from './ProductsForm';
import ProductsPage from './ProductsPage';
import ProductDetailsPage from './ProductDetailsPage';
import CartPage from './CartPage';

function App() {
  const [user, setUser] = useState({
    userName: '',
    password: '',
  });

  return (
    <div className="App">
      <Routes>
        <Route path='login' element = { <Login user={user} setUser={setUser} />}/>
        <Route path='register' element = { <Register user={user} setUser={setUser} />}/>
        <Route path='productsform' element = { <ProductsForm/>}/>
        <Route path='products' element = { <ProductsPage/>}/>
        <Route path='cartpage' element = { <CartPage />}/>
        <Route path='products/:id' element = { <ProductDetailsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

/* TO do: 
  *display products
  
*/