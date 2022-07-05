import React from "react";
import URL from "./URL";
import GooglePlayImg from "../../assets/GooglePlay.png";
import AppStoreImg from "../../assets/AppStore.png";

const Store = () => {
  return (
    <div>
      <h3 className="text-size-medium font-medium text-center mtb-lg">
        Get the app.
      </h3>
      <div className="download-link">
        <URL img={AppStoreImg} url={process.env.REACT_APP_APPLE_STORE_IMAGE} />
        <URL
          img={GooglePlayImg}
          url={process.env.REACT_APP_GOOGLE_PLAY_STORE_IMAGE}
        />
      </div>
    </div>
  );
};

export default Store;
