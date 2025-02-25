import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import CartContext from './CartContext.jsx';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
    <Router>
      <CartContext>
       <App />
       </CartContext>
    </Router>
  
);
