import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export default () => (
    <div className="loader-container">
        <ScaleLoader size={50} color={"#525A62"} loading={true} />
        <span>My Node/Express server is hosted on a free Heroku Dyno 🤓
        <br /> hence it takes some ⏱ to start...</span>
    </div>
);
