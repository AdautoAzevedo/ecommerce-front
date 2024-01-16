import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoadingPage from './LoadingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>        
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

