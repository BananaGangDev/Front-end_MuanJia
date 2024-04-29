import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '/src/cardContext.jsx';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import '/src/styles/CheckoutForm.css';

const CheckoutForm = () => {
    const { items } = useCart();
    const navigate = useNavigate();
    // const [formData, setFormData] = useState({
    //     firstname: '',
    //     lastname: '',
    //     phone: '',
    //     email: '',
    //     address: '',
    //     subdistrict: '',
    //     district: '',
    //     province: '',
    //     postalCode: '',
    //     deliveryMethod: ''
    // });
    const [formData, setFormData] = useState(() => {
        // Check for existing data in sessionStorage on initial render
        const dataFromStorage = sessionStorage.getItem('checkoutFormData');
        if (dataFromStorage) {
          // Pre-populate form with data if available
          return JSON.parse(dataFromStorage);
        } else {
          return {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            address: '',
            subdistrict: '',
            district: '',
            province: '',
            postalCode: '',
            deliveryMethod: 'COD', // Default delivery method
          };
        }
      });

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDeliveryMethodChange = (event) => {
        const { value } = event.target;
        setFormData({ ...formData, deliveryMethod: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sessionStorage.setItem('checkoutFormData', JSON.stringify(formData));
        // const itemsFormatted = formatItemsForAPI();
    //     const { deliveryMethod } = fromData;
    //     if (deliveryMethod === 'BANK_TRANSFER') {
    //         navigate('/confirm', { state: { formData, items, totalPrice } });
    //     } else {
    //         navigate('/success');
    //     }
    //     console.log('Form submitted:', formData);
    // };
        console.log(formData);
        navigate('/confirm', { state: { formData, items, totalPrice } });
    };

    // const formatItemsForAPI = () => {
    //     return JSON.stringify(items.reduce((acc, item) => {
    //         acc[item.id] = item.quantity;
    //         return acc;
    //     }, {}));
    // };

    useEffect(() => {
        sessionStorage.setItem('checkoutFormData', JSON.stringify(formData));
      }, [formData]);


    return (
        <div className="checkout-form">
            <div className='header-bar'>
                <IoArrowBackCircleOutline
                    onClick={() => navigate('/basket')}
                    className='back-icon'
                />
                <h2 className='checkout-h2'>ยืนยันคำสั่งซื้อ</h2>
            </div>

            <p className='checkout-p'>กรอกข้อมูลให้ครบถ้วน</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        className='checkout-input'
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder='ชื่อ'
                        value={formData.firstname}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className='checkout-input'
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder='นามสกุล'
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className='checkout-input'
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder='เบอร์โทรศัพท์'
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className='checkout-input'
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className='checkout-input'
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        placeholder='ที่อยู่'
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className='checkout-input'
                        type="text"
                        name="subdistrict"
                        id="subdistrict"
                        value={formData.subdistrict}
                        placeholder='ตำบล/แขวง'
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className='checkout-input'
                        type="text"
                        name="district"
                        id="district"
                        value={formData.district}
                        placeholder='อำเภอ/เขต'
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className='checkout-input'
                        type="text"
                        name="province"
                        id="province"
                        value={formData.province}
                        placeholder='จังหวัด'
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className='checkout-input'
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder='รหัสไปรษณีย์'
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <select
                        className='checkout-input'
                        id="deliveryMethod"
                        name="deliveryMethod"
                        value={formData.deliveryMethod}
                        onChange={handleDeliveryMethodChange}
                    >
                        <option value="COD">ชำระเงินปลายทาง</option>
                        <option value="BANK_TRANSFER">ชำระเงินทันที</option>
                    </select>
                </div>


                <div className='footer-bar'>
                    <div className="total-price">
                        <p>ยอดรวม: {totalPrice} บาท</p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="checkout-button">ถัดไป</button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
