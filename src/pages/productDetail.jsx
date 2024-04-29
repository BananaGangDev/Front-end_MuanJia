import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import api from '/src/api.jsx';
import { useCart } from '/src/cardContext.jsx';
import '/src/styles/productDetail.css';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  // save product quantity in session storage
  // const initialQuantity = sessionStorage.getItem(`quantity-${productId}`) ? parseInt(sessionStorage.getItem(`quantity-${productId}`)) : 0;
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      // const productDoc = doc(app, 'products', productId); // Reference the product document
      // const productData = await getDoc(productDoc);
      // if (productData.exists()) {
      //   setProduct(productData.data());
      // } else {
      //   console.error('Product not found:', productId);
      // }
      try {
        const response = await api.get(`/product/id/${productId}`);
        if (response.status === 200 && response.data) {
          let productInfo = response.data[productId];
          if (productInfo) {
            productInfo = { ...productInfo, product_id: productId };
            setProduct(productInfo);
            console.log("Product data: ", productInfo);
          } else {
            console.error('Product not found with ID:', productId);
          }
        } else {
          console.error('Product not found:', productId);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    sessionStorage.setItem(`quantity-${productId}`, quantity.toString());
  }, [quantity, productId]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  // const imageUrl = product.image_url;
  // const description = product.description;
  // const price = product.price;
  // const productName = product.product_name;

  // const handleQuantityChange = (e) => {
  //   const newQuantity = parseInt(e.target.value);
  //   if (newQuantity >= 0) {
  //     setQuantity(newQuantity);
  //   }
  // };

  const handleAddToCart = () => {

    // const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    // const existingCartItemIndex = cart.findIndex(item => item.id === product.id);

    // if (existingCartItemIndex >= 0) {
    //   cart[existingCartItemIndex].quantity += quantity;
    // } else {
    //   cart.push({
    //     id: product.id,
    //     name: product.product_name,
    //     price: product.price,
    //     quantity: quantity,
    //     totalPrice: quantity * product.price
    //   });
    // }
    
    addItem({
      id: product.product_id,
      name: product.product_name,
      price: product.price,
      image_url: product.image_url,
    });
    // setQuantity(0);
    alert(`เพิ่ม ${product.product_name} ลงตะกร้า`);
    console.log(`Added ${product.product_id} ${product.product_name} to cart!`);
  };


  const handleGoback = () => {
    navigate('/info');
  };

  return (
    <div className="product-detail">
      <div className='header-bar'>
        <IoArrowBackCircleOutline className='back-icon' onClick={handleGoback}/>
        <h2 className='detail-h2'>รายละเอียดสินค้า</h2>
      </div>

      <div className='detail-group'>
        <img src={product.image_url} alt={product.product_name} className='detail-img'/>
        <h2 className='detail-pd-name'>{product.product_name}</h2>
        <p className='detail-description'>{product.description}</p>
        <div className="audio-container">
          <audio src={product.sound_url} controls ></audio>
          {/* crossOrigin="anonymous" */}
        </div>

      </div>

      <div className='footer-bar'>
        <div className="detail-price">
          <p>ราคา: {product.price} บาท</p>
        </div>
        {/* <div className="quantity-select">
          <button onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</button>
          <p onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} >{quantity}</p>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div> */}
        <button
          onClick={handleAddToCart}
          type="submit"
          className="submit-detail-button">เพิ่มลงตะกร้า</button>
      </div>
    </div>
  );
}