import React, { useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
// import { useCart } from '/src/cardContext.jsx';
import '/src/styles/payment.css';
import api from '/src/api.jsx';
// import { read } from 'fs';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { order_id, totalPrice } = location.state || {};
    const [selectedFile, setSelectedFile] = useState(null);
    // let filePath = '';

    console.log("Total price: ",totalPrice)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(`File size: ${(file.size / 1024).toFixed(2)} KB`);
            compressImage(file);
        }
    };  

    const compressImage = (imageFile) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // กำหนดขนาด
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 600;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                ctx.canvas.toBlob((blob) => {
                    const newFile = new File([blob], imageFile.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    setSelectedFile(newFile);
                }, 'image/jpeg', 0.7);
            };
        };
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const slip = new FormData();
    //         slip.append('path_slip', filePath);
    //         const response = await api.put(`/payment/update_status/${order_id}/`,slip);
    //         if (response.status === 200) {
    //             console.log(`Order ID: ${order_id}`);
    //             console.log("slip path: ", slip);
    //             navigate('/success', { state: { orderDetails: order_id } });
    //             // navigate('/confirm', { state: { formData, items, totalPrice } });
    //         } else {
    //             console.error('Failed to create order with BANK_TRANSFER');
    //         }
    //     } catch (error) {
    //         console.error('Error creating order with BANK_TRANSFER:', error);
    //     }
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile && selectedFile.size / 1024 < 100) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = async () => {
                const base64 = reader.result;
                const base64Size = 4 * Math.ceil((base64.length / 3)) * 0.5624896334383812;
                // แปลงขนาดจาก bytes เป็น kilobytes
                const sizeInKb = base64Size / 1024;
                console.log(`Size of base64 file: ${sizeInKb.toFixed(2)} KB`);

                try {
                    const response = await api.put(`/payment/${order_id}/${encodeURIComponent(base64)}`);
                    if (response.status === 200) {
                        console.log(`Order ID: ${response.data.order_id}`);
                        navigate('/success', { state: { orderDetails: response.data.order_id } });
                    } else {
                        console.error('Failed to update payment status');
                    }
                } catch (error) {
                    console.error('Error updating payment status:', error);
                }
            };
        } else {
            console.error('The file is too large.');
        }
    };

    return (
        <div className="checkout-form">
            <header className="header-bar">
                <IoArrowBackCircleOutline 
                    className='back-icon'
                    onClick={() => navigate("/confirm")} />
                <h2 className="checkout-h2">ชำระเงิน</h2>
            </header>

            <div className='account-info'>
                <div className='account-number'>
                    <p className='payment-p'>หมายเลขบัญชี:</p>
                    <p className='payment-p-2'>1234567890987654</p>
                </div>
                <div className='account-name'>
                    <p className='payment-p'>ชื่อบัญชี:</p>
                    <p className='payment-p-2'>ภัทรดา มิโคทะ</p>
                </div>
                <div className='payment-total-price'>
                    <p className='payment-p'>จำนวนเงิน (บาท):</p>
                    <p className='payment-p-2'>{totalPrice} บาท</p>
                </div>
                <div class="payment-upload">
                    <p className="payment-p">แนบหลักฐานการชำระเงิน:</p>
                    <label htmlFor="uploadReceipt" className='payment-upload-label'>
                        <input 
                            type="file" 
                            id="uploadReceipt" 
                            name="uploadReceipt" 
                            className="payment-slip"
                            onChange={handleFileChange} />
                    </label>
                </div>
            </div>

            <form>

                <div className="payment-footer-bar">
                    <button 
                        onClick={handleSubmit}
                        type="submit" 
                        className="payment-button">ยืนยันการชำระเงิน</button>
                </div>
            </form>
        </div>
    );
};

export default Payment;

// ช่วยแก้ไขให้สามารถส่วไฟล์แบบ based64 ได้ ไปให้ server และก่อน
