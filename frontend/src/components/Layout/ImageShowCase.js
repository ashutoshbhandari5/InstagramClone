import React from "react";
import childImage from "../../assets/childImage.png";
import parentImage from "../../assets/parentImage.png";

const ImageShowCase = () => {
  return (
    <section className="image-showcase">
      <img className="parent-image" src={parentImage} alt="parentImage" />
      <img className="child-image" src={childImage} alt="childImage" />
    </section>
  );
};

export default ImageShowCase;
