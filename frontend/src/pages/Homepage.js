import React from "react";
import { Navigate } from "react-router-dom";

const Homepage = () => {
  const user = "";

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <div>This is home Page</div>;
};

export default Homepage;
