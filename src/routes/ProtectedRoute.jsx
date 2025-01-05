import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
        const {loading,user} = useAuth();
        const location = useLocation();
        if(loading){
            return <LoadingSpinner/>
        }
        if (user) {
            return children;
        }
        
    return (
        <Navigate to="/login" state={location.pathname}></Navigate>
    );
};

export default ProtectedRoute;