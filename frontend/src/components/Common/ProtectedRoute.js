import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = () => {
  const location = useLocation();
  const accessToken = JSON.stringify(localStorage.getItem("accessToken"));
  const auth = useSelector((state) => state.auth);
  console.log("Hit protected route");
  const user = "";

  console.log(auth?.user);
  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
