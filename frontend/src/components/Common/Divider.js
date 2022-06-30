import React from "react";
import BorderLine from "./BorderLine";

const Divider = () => {
  return (
    <div className="divider">
      <BorderLine />
      <span className="uppercase">or</span>
      <BorderLine />
    </div>
  );
};

export default Divider;
