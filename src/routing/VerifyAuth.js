import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const VerifyAuth = ({ component: Component, authRoles }) => {
  const user = useSelector((state) => state.loginReducer);

  if (authRoles.is_staff.includes(user.company_name)) {
    //for signed users and user is signed in
    if (user.is_staff) {
      return <Component />;
    } else {
      return <Navigate to="/enterprise" replace />;
    }
  } else {
    return <Navigate to="/" replace />;
  }
};
