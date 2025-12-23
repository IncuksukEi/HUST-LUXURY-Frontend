import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const location = useLocation();

    // Check if token exists and role is ADMIN
    // In a real app, you might want to verify token expiration too
    const isAuthenticated = token && role === 'ADMIN';

    if (!isAuthenticated) {
        // Redirect to login page, but save the current location to redirect back after login
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
