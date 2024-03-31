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

        console.log("requireAuth: " + jwtToken)

        if (jwtToken) {
            setToken(jwtToken);
        } else {
            console.log("setze token zu null...")
            Cookies.remove('token')
            setToken(null);
        }


        setIsLoading(false);
    }, [token, location.pathname]);

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
