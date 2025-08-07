import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // vagy: töröld a cookie-t is, ha azt használsz
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
