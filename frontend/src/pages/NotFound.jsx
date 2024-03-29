import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const NotFound = () => {

    const navigate = useNavigate();


 /*    useEffect(() => {
        navigate('/login');
    }, [navigate]); */

    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
        </article>
    )
}

export default NotFound;
