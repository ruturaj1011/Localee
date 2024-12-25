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
            // Save the page user initially tried to access
            if (location.pathname !== "/auth/user/login") {
                localStorage.setItem("redirectTo", location.pathname);
            }
            navigate("/auth/user/login");
            return;
        }

        const decodedToken = decodeToken(token);

        if (!decodedToken || (decodedToken.exp * 1000 < Date.now())) {
            // Token is invalid or expired
            localStorage.removeItem("token");
            navigate("/auth/user/login");
        }
    }, [navigate, location.pathname]);
};

export default useAuth;
