import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const RequireAuth = () => {
    const { token, setToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        
        const jwtToken = Cookies.get("token");

        console.log(jwtToken)
     
        setToken(jwtToken);

        setIsLoading(false);
    }, [setToken]);

    if (isLoading) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        );
    }


    return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
