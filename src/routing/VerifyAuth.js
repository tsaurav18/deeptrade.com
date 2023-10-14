import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const VerifyAuth = ({ component: Component, authRoles }) => {
  const user = useSelector((state) => state.loginReducer);

  if (user.is_staff === true) {
    //for signed users and user is signed in
    if (authRoles.is_staff.includes(user.company_name)) {
      return <Component />;
    } else {
      return <Navigate to="/enterprise" replace />;
    }
  } else {
    return <Navigate to="/" replace />;
  }
};
