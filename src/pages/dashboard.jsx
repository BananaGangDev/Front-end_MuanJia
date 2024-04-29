import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from "react-icons/io5";
import '/src/styles/dashboard.css';

const Dashboard = () => {

    const navigate = useNavigate();

    const handleGoback = () => {
        navigate("/info");
    }

    return (
        <div className='dashboard'>
            <div className='header-bar'>
                <IoArrowBackCircleOutline className='back-icon' onClick={handleGoback} />
                <h2 className='basket-h2'>Dashboard</h2>
            </div>
            <div className='iframe-container'>
                <iframe
                    className='iframe'
                    src="https://lookerstudio.google.com/embed/reporting/d756a8c6-609e-4f3c-97f1-3ceb84920b03/page/a2TyD"
                    frameborder="0"
                    allowfullscreen
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">

                </iframe>
            </div>
        </div>

    );
};

export default Dashboard;