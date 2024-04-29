import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import InfoPage from '/src/pages/info.jsx';
import ProductDetail from '/src/pages/productDetail.jsx';
import CheckoutForm from '/src/pages/CheckoutForm.jsx';
import Payment from './pages/payment';
import OrderSuccess from './pages/success';
import MyBasket from './pages/myBasket';
import Dashboard from './pages/dashboard';
// import confirmCheckout from '/src/pages/confirmCheckout.jsx';
import ConfirmPage from './pages/confirmCheckout';
import './index.css';
import { CartProvider } from '/src/cardContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>

        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/detail/:productId" element={<ProductDetail />} />
          <Route path="/basket" element={<MyBasket />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/confirm" element={<ConfirmPage/>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<>Not Found</>} /> {/* Consistent formatting for not found */}
        </Routes>

      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
