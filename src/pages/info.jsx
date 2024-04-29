import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '/src/api.jsx';
import { HiOutlineHome } from "react-icons/hi2";
import { PiBasket } from "react-icons/pi";
import { GoGraph } from "react-icons/go";
import '/src/styles/info.css';

export default function InfoPage() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Added to store all products
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get(`/product/`);
      if (response.status === 200 && response.data) {
        const productData = Object.keys(response.data).map(key => {
          const product = response.data[key];
          return {
            id: key,
            product_name: product.product_name,
            description: product.description,
            price: product.price,
            image_url: product.image_url,
            sound_url: product.sound_url
          };
        });
        setProducts(productData);
        setAllProducts(productData);
      } else {
        console.error('API response is missing expected data');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = allProducts.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm)
      );
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  }, [searchTerm, allProducts]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleNav1Click = () => {
    navigate("/")
  }

  const handleNav2Click = () => {
    navigate("/basket")
  }

  const handleNav3Click = () => {
    navigate("/dashboard");
  }

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="searchBar">
        <input
          className='search-box'
          type="search"
          placeholder="Search Something in MuanJia Shop"
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* <button onClick={handleSearch}>🔍</button> */}
      </div>

      {/* Product Cards */}
      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <Link to={`/detail/${product.id}`}>
              <img className='product-img' src={product.image_url} alt={product.product_name} />
              <p className='product-name'>{product.product_name}</p>
              <p className='product-price'>{product.price} บาท</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="nav">
        <div className='nav-1' onClick={handleNav1Click}>
          <HiOutlineHome className='nav-icon'/>
          <Link className='nav-link' to="/">HOMEPAGE</Link>
        </div>
        <div className='nav-2' onClick={handleNav2Click}>
          <PiBasket className='nav-icon'/>
          <Link className='nav-link' to="/basket">MY BASKET</Link>
        </div>
        <div className='nav-3' onClick={handleNav3Click}>
          <GoGraph className='nav-icon'/>
          <Link className='nav-link' to="/basket">DASHBOARD</Link>
        </div>
      </nav>
    </div>
  );
}
