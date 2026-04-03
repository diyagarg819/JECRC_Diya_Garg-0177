import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div>
            <h2>User Profile</h2>
            <p>Welcome, {user && user.username}!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserProfile;