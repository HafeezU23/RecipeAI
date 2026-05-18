import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

const Protected = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; //prevent to go back to protected page using 'replace'
  }

  return children;
};

export default Protected;
