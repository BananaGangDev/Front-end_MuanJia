// import React, { useState, useEffect } from 'react';
// import { useCart } from '/src/cardContext.jsx';
// import { useNavigate } from 'react-router-dom';
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import '/src/styles/myBasket.css';

// const MyBasket = () => {
//     const { items, updateQuantity, removeQuantity } = useCart();
//     const navigate = useNavigate();

//     // const initialQuantity = sessionStorage.getItem(`quantity-${items.id}`) ? parseInt(sessionStorage.getItem(`quantity-${items.id}`)) : quantity;
//     // const [quantity, setQuantity] = useState(initialQuantity);

//     const handleUpdateQuantity = (name, newQuantity) => {
//         updateQuantity(name, newQuantity);
//       };

//       const handleRemoveItem = name => {
//         removeItem(name);
//       };

//     const formatPrice = (price) => {
//         return `${price.toFixed(2)}`;
//     };

//     const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

//     const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

//     console.log(items);

//     const handleGoback = () => {
//         navigate('/info');
//     }

//     useEffect(() => {
//         sessionStorage.setItem(`quantity-${items.name}`, quantity.toString());
//     }, [quantity, items.id]);

//     return (
//         <div className="my-basket">
//             <div className='header-bar'>
//                 <IoArrowBackCircleOutline className='back-icon' onClick={handleGoback} />
//                 <h2 className='basket-h2'>ตะกร้าของฉัน</h2>
//             </div>
//             <div className="basket-items">
//                 {items.length > 0 ? (
//                     items.map((item) => (
//                         <div key={item.name} className="basket-item-card">
//                             <div className='basket-item-card-left'>
//                                 <img src={item.image_url} alt={item.name} className="basket-image" />
//                                 <span className="item-name">{item.name} x{item.quantity}</span>
//                             </div>
//                             <div className='basket-item-card-right'>
//                                 <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
//                             </div>
//                             <div className="quantity-select">
//                                 <button onClick={() => handleUpdateQuantity(item.name, Math.max(0, item.quantity - 1))}>-</button>
//                                 <p>{item.quantity}</p>
//                                 <button onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)}>+</button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>ตะกร้าของคุณว่างเปล่า</p>
//                 )}
//             </div>

//             <div className="footer-bar">
//                 <p>ราคา: {formatPrice(totalPrice)} บาท</p>
//                 <button className="checkout-button">ชำระเงิน</button>
//             </div>
//         </div>
//     );
// };

// export default MyBasket;

import React from 'react';
import { useCart } from '/src/cardContext.jsx';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import '/src/styles/myBasket.css';

const MyBasket = () => {
    const { items, updateQuantity, removeItem } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return `${price.toFixed(2)}`;
    };

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleGoback = () => {
        navigate('/info');
    };

    const handleUpdateQuantity = (id, newQuantity) => {
        updateQuantity(id, Math.max(1, newQuantity));
    };

    const handleRemoveItem = id => {
        removeItem(id);
    };

    const handleGotoCheckout = () => {
        navigate('/checkout');
    }

    console.log("items: ", items);

    items.map(item => {
        console.log(item.id);
    });

    return (
        <div className="my-basket">
            <div className='header-bar'>
                <IoArrowBackCircleOutline className='back-icon' onClick={handleGoback} />
                <h2 className='basket-h2'>ตะกร้าของฉัน</h2>
            </div>
            <div className="basket-items">
                {items.length > 0 ? items.map((item) => (
                    <div key={item.id} className="basket-item-card">
                        <div className='basket-item-card-left'>
                            <img src={item.image_url} alt={item.name} className="basket-image" />
                            <span className="item-name">{item.name} x {item.quantity}</span>
                        </div>
                        <div className='basket-item-card-right'>
                            <span className="item-price">{formatPrice(item.price * item.quantity)} บาท</span>
                            <div className="quantity-select">
                                <button onClick={() => handleUpdateQuantity(item.name, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)}>+</button>
                            </div>
                            <RiDeleteBinLine onClick={() => handleRemoveItem(item.name)} />
                        </div>
                    </div>
                )) : <p>ตะกร้าของคุณว่างเปล่า</p>}
            </div>
            <div className="footer-bar">
                <p className='basket-price'>ราคา: {formatPrice(totalPrice)} บาท</p>
                <button className="goto-checkout-button" onClick={handleGotoCheckout}>ชำระเงิน</button>
            </div>
        </div>
    );
};

export default MyBasket;
