import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `http://localhost:8000/auth/`,
});

export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);
    const router = useNavigate();

    const logout = () => {
        localStorage.clear(); // Clears all local storage data
        setUserData(authContext);
        router("/");
    };

    const isLoggedIn = () => {

        const token = localStorage.getItem("token");
        
        return token && token.length > 0;
    }

    const handleVendorRegister = async (name, email, password, phone, businessName, city, state, address) => {
        try {
            const request = await client.post("/vendor/register", {
                name,
                email,
                password,
                phone,
                businessName,
                city,
                state,
                address
            });

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    const handleVendorLogin = async (email, password) => {
        try {
            const request = await client.post("/vendor/login", {
                email,
                password,
            });

            if (request.status === httpStatus.OK) {

                localStorage.setItem("token", request.data.token);
                setUserData({ role: "vendor", ...request.data.vendorDetails });
                
                const redirectTo = localStorage.getItem("redirectTo") || "/";
                localStorage.removeItem("redirectTo");

                router(redirectTo); 
            }
        } catch (e) {
            throw e;
        }
    };

    const handleUserRegister = async (name, email, password, phone, city, state) => {
        try {
            const request = await client.post("/user/register", {
                name,
                email,
                password,
                phone,
                city,
                state
            });

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    };

    const handleUserLogin = async (email, password) => {
        try {
            const request = await client.post("/user/login", {
                email,
                password,
            });

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                setUserData({ role: "user", ...request.data.userDetails });
                
                const redirectTo = localStorage.getItem("redirectTo") || "/";
                
                localStorage.removeItem("redirectTo"); 

                router(redirectTo); 
            }
        } catch (e) {
            throw e;
        }
    };

    const data = {
        userData,
        setUserData,
        logout,
        isLoggedIn,
        handleVendorLogin,
        handleVendorRegister,
        handleUserLogin,
        handleUserRegister,
    };

    return <AuthContext.Provider value={data}>
                {children}
            </AuthContext.Provider>;
};
