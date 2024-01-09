import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  if (!token && window.location.pathname === "/") {
    navigate("/admin");
    return null;
  }

  return <>{children}</>;
};

export default ProtectRoute;
