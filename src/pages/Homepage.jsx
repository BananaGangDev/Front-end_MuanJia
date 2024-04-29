import React from 'react';
import { Link } from 'react-router-dom';
import '/src/styles/Homepage.css';
import muanjia_logo from '/src/assets/muajia-logo.jpg';
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLine } from "react-icons/fa6";


const Homepage = () => {
  return (
    <div className='homepage-container'>
      <div className='text-header'>
        {/* <h1>Muan Jia</h1>
        <h2>Studio</h2> */}
        <img src={muanjia_logo} className='muanjia-logo'></img>
        <p className='homepage-p'>Handmade Accessories ที่จะทำให้คุณรู้สึกม่วนใจ๋ เหมือนแม่เย็บให้ลูกใส่</p>
      </div>
      <div className="social-buttons">
        <div className="instagram-btn">
         <FaSquareInstagram />
         <Link to="https://www.instagram.com/muanjia.studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className='ig'>INSTAGRAM</Link>
        </div>
        <div className="lineshop-btn">
          <FaLine />
          <Link to="https://line.me/R/ti/p/@606qvrdr?oat_content=url" className='line'>LINE OFFICIAL</Link>
        </div>
        <Link to="/info" className="info-btn">เข้าสู่หน้าเว็ปไซต์</Link>
      </div>
    </div>
  );
};

export default Homepage;
