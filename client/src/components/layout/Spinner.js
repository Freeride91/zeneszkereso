import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export default () => (
    <div className="loader-container">
        <ScaleLoader size={50} color={"#525A62"} loading={true} />
    </div>
);
