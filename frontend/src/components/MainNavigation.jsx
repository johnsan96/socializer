import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Menu, MenuItem } from '@mui/material';
import useAuth from '../hooks/useAuth';
import Cookies from 'js-cookie';


function MainNavigation() {
    const navigate = useNavigate();
 
    const [anchorEl, setAnchorEl] = useState(null);
    const { token, setToken } = useAuth();

 /*    const projects = useProjects(); */

    const handleLogout = () => {
       /*  localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiration'); */
        Cookies.remove('token')
        setToken(null);
        navigate('/login');
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className="main-header">
            <nav className="d-flex justify-content-between align-items-center pe-5 ps-5">
                <div className="p-2 mb-4">
                    <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                        <NavLink to="/" className="text-decoration-none mt-1 site-title" sx={{ color: 'white' }}>
                            Sociolizer
                        </NavLink>
                    </Typography>
                    <ul className="nav nav-pills mt-4 d-flex flex-row align-self-center">
                        <li className="nav-item me-2">
                            <Button component={NavLink} to="/" activeClassName="active" className="nav-link" end>
                                Dashboard
                            </Button>
                        </li>
                        
                        <li className="nav-item me-2">
                            <Button component={NavLink} to="/createPost" activeClassName="active" className="nav-link">
                                Create Post
                            </Button>
                        </li>
                      {/*   <li className="nav-item me-2">
                            <Button component={NavLink} to="/people" activeClassName="active" className="nav-link">
                                People
                            </Button>
                        </li> */}
                    </ul>
                </div>
                <div className="nav nav-pills mt-4 d-flex flex-row align-self-center">
                    <Button onClick={handleLogout} className="btn btn-primary">
                        <i className="bi bi-box-arrow-left"></i> Logout
                    </Button>
                </div>
            </nav>
        </header>
    );
}

export default MainNavigation;
