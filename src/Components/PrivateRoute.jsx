import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
// 
    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-[500px]">
                <span className="loading loading-ring loading-lg size-24"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
