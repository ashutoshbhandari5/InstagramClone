import React from "react";

const URL = ({ img, url, text }) => {
  if (img) {
    return (
      <div>
        <a href={url}>
          <img style={{ width: "140px" }} src={img} alt="text" />
        </a>
      </div>
    );
  }

  return <a href={url}>{text}</a>;
};

export default URL;
