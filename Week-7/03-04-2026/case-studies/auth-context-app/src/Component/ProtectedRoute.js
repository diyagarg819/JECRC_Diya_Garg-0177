import React from "react";

import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return <p>Loading...</p>;
    }   
    if (!isAuthenticated) {
        return <p>Access Denied. Please login to continue.</p>;
    }
    return children;
};

export default ProtectedRoute;