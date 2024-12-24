import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const decodeToken = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(base64));
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            localStorage.setItem("redirectTo", location.pathname);

            navigate("/auth/user/login");
            return;
        }

        try {
            const decodedToken = decodeToken(token); // Decode JWT
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("token"); // Token expired, remove it
                navigate("/auth/user/login"); // Redirect to login
            }
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem("token");
            navigate("/auth/user/login"); // Redirect to login
        }
    }, [navigate, location.pathname]);
};

export default useAuth;
