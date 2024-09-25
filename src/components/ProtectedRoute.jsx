/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // Ambil data user dari store
  const user = useSelector((state) => state.userState.user);

  if (!user) {
    // Jika user belum login, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika user sudah login, tampilkan halaman yang dilindungi
  return children;
};

export default ProtectedRoute;
