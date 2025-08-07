import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
    const user = localStorage.getItem('token'); // Assuming user data is stored in localStorage
    console.log("Token in ProtectedRoutes:", user);

    return user ? <Outlet /> : <Navigate to="/login" replace />
}
export default ProtectedRoutes;