import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '/src/cardContext.jsx';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import '/src/styles/confirmCheckout.css';
import api from '/src/api.jsx';

const ConfirmCheckout = () => {
    const { items } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const { formData, totalPrice } = location.state || { formData: null, totalPrice: null };

    useEffect(() => {
        if (!formData) {
            console.error('formData is not provided');
            navigate('/checkout');
        }
    }, [formData, navigate]);

    const handleCheckout = async () => {

        const formattedItems = items.map(item => `"${item.id}":${item.quantity}`).join(",");
        const jsonString = `{${formattedItems}}`;

        const orderData = {
            product_id: items.id, 
            firstname: formData.firstname,
            lastname: formData.lastname,
            phone: formData.phone,
            email: formData.email,
            address: `${formData.address} ${formData.subdistrict} ${formData.district} ${formData.province} ${formData.postalCode}`,
            payment: formData.deliveryMethod,
            items: jsonString
        };

        // console.log(orderData);
        console.log("formattedItems: ", jsonString);
        console.log("formattedItems type: ", typeof(jsonString))

        if (formData.deliveryMethod === 'COD') {
            try {
                const response = await api.post(`/order/create/${orderData.firstname}/${orderData.lastname}/${orderData.phone}/${orderData.email}/${orderData.address}/${orderData.payment}/${orderData.items}`);
                if (response.status === 201) {
                    const order_id = response.data.order_id;
                    console.log(`Order ID: ${response.data.order_id}`);
                    navigate('/success', { state: { order_id } });
                    // sessionStorage.clear();
                    // navigate('/confirm', { state: { formData, items, totalPrice } });
                } else {
                    console.error('Failed to create order with COD');
                }
            } catch (error) {
                console.error('Error creating order with COD:', error);
            }
        } else if (formData.deliveryMethod === 'BANK_TRANSFER') {
            try {
                const response = await api.post(`/order/create/${orderData.firstname}/${orderData.lastname}/${orderData.phone}/${orderData.email}/${orderData.address}/${orderData.payment}/${orderData.items}`);
                if (response.status === 201) {
                    const order_id = response.data.order_id;
                    console.log(`Order ID: ${response.data.order_id}`);
                    navigate('/payment', { state: { order_id, totalPrice } });
                    sessionStorage.clear();
                    // navigate('/confirm', { state: { formData, items, totalPrice } });
                } else {
                    console.error('Failed to create order with COD');
                }
            } catch (error) {
                console.error('Error creating order with COD:', error);
            }
        }
    };

    return (
        <div className="confirm-checkout">
            <div className='header-bar'>
                <IoArrowBackCircleOutline
                    onClick={() => navigate('/checkout')}
                    className='back-icon'
                />
                <h2 className='checkout-h2'>ยืนยันคำสั่งซื้อ</h2>
            </div>

            <div className='confirm-order-details'>
                <h3 className='order-details-title'>ตรวจสอบความถูกต้อง</h3>
                <div className='order-items-card'>
                    {items.map((item) => (
                        <div key={item.id} className="basket-item-card">
                            <div className='basket-item-card-left'>
                                <img src={item.image_url} alt={item.name} className="basket-image" />
                                <span className="item-name">{item.name} x {item.quantity}</span>
                            </div>
                            <div className='basket-item-card-right'>
                                <span>{item.price * item.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='user-details'>
                    <div className='user-info-list'>
                        <div className='user-info-item'>
                            <span className='user-info-label'>ชื่อ:</span>
                            <span className='user-info-value'>{formData.firstname} {formData.lastname}</span>
                        </div>
                        <div className='user-info-item'>
                            <span className='user-info-label'>เบอร์โทรศัพท์:</span>
                            <span className='user-info-value'>{formData.phone}</span>
                        </div>
                        <div className='user-info-item'>
                            <span className='user-info-label'>อีเมล:</span>
                            <span className='user-info-value'>{formData.email}</span>
                        </div>
                        <div className='user-info-item'>
                            <span className='user-info-label'>ที่อยู่:</span>
                            <span className='user-info-value'>{formData.address}</span>
                        </div>
                        <div className='user-info-item'>
                            <span className='user-info-label'>ตำบล/แขวง:</span>
                            <span className='user-info-value'>{formData.subdistrict}</span>
                        </div>
                        <div className='user-info-item'>
                            <span className='user-info-label'>อำเภอ/เขต:</span>
                            <span className='user-info-value'>{formData.district}</span>
                        </div>
                        <div className='user-info-item'>
                            <span className='user-info-label'>จังหวัด:</span>
                            <span className='user-info-value'>{formData.province}</span>
                        </div>
                        <div className='user-info-item'>
                            <span className='user-info-label'>รหัสไปรษณีย์:</span>
                            <span className='user-info-value'>{formData.postalCode}</span>
                        </div>
                        <div className='user-info-item'>
                            <span className='user-info-label'>วิธีการชำระเงิน:</span>
                            <span className='user-info-value'>{formData.deliveryMethod}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='confirm-footer-bar'>
                <p className="item-price">{totalPrice} บาท</p>
                <button className='edit-button' onClick={() => navigate('/checkout')}>แก้ไขข้อมูล</button>
                <button className='checkout-button' onClick={handleCheckout}>ถัดไป</button>
            </div>
        </div>
    );
};

export default ConfirmCheckout;