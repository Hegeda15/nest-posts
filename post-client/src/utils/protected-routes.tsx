import { Outlet,Navigate } from "react-router-dom";
const ProtectedRoutes=()=>{
    const user= localStorage.getItem('token'); // Assuming user data is stored in localStorage
    return user ? <Outlet /> : <Navigate to="/login" replace />
}
export default ProtectedRoutes;