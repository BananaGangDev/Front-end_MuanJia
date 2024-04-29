import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '/src/styles/success.css'
// import { TbShoppingBagCheck } from "react-icons/tb";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { order_id } = location.state || {};
    
    return (
        <div className='success-container'>
            <div className='header-bar'>
                <h2 className='success-h2'>ชำระเงินสำเร็จ</h2>
            </div>
            <div className="order-success-container">
                {/* <TbShoppingBagCheck className='success-icon'/> */}
                <img src='src/assets/mobile-payment.png' className='success-img'/>
                <h1 className='success-h1'>สั่งซื้อสำเร็จ</h1>
                <p>Order ID ของคุณคือ {order_id}</p>
                <p className='success-p'>รอการยืนยันการชำระเงินจากเจ้าของบัญชี</p>
            </div>
            <div className='success-footer-bar'>
                <button 
                    onClick={() => navigate('/info')}
                    type="submit"
                    className="success-button">กลับไปหน้าหลัก</button>
            </div>
        </div>
    );
};

export default OrderSuccess;
