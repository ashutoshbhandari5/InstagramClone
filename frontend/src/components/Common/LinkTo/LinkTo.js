import React from "react";
import { Link } from "react-router-dom";

const LinkTo = ({ linkTo, children }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={linkTo}>
      {children}
    </Link>
  );
};

export default LinkTo;
