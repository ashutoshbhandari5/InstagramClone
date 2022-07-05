import React from "react";

const Tags = ({ page }) => {
  return page === "login" ? (
    <div className="color-dark-gray tags">
      <div>
        <h6>Meta</h6>
        <h6>About</h6>
        <h6>Blog</h6>
        <h6>Jobs</h6>
        <h6>Help</h6>
        <h6>API</h6>
        <h6>Privacy</h6>
        <h6>Terms</h6>
        <h6>Top Accounts</h6>
        <h6>Hashtags</h6>
        <h6>Locations</h6>
        <h6>Instagram Lite</h6>
      </div>
      <div>
        <h6>Dance</h6>
        <h6>Food & Drink</h6>
        <h6>Home & Garden</h6>
        <h6>Music</h6>
        <h6>Visual Arts</h6>
      </div>
    </div>
  ) : (
    <div className="color-dark-gray flex-tags">
      <h6>Meta</h6>
      <h6>About</h6>
      <h6>Blog</h6>
      <h6>Jobs</h6>
      <h6>Help</h6>
      <h6>API</h6>
      <h6>Privacy</h6>
      <h6>Terms</h6>
      <h6>Top Accounts</h6>
      <h6>Hashtags</h6>
      <h6>Locations</h6>
      <h6>Instagram Lite</h6>
      <h6>Contact Uploading & Non-Users</h6>
    </div>
  );
};

export default Tags;
