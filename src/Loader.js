import React from "react";
import { PulseBubbleLoader } from "react-loaders-kit";
import "./style/loader.css";

function Loader() {
  const loaderProps = {
    loading: true,
    size: 275,
    duration: 2,
    colors: ["#0064EB", "#0064EB", "#0064EB"],
  };

  return (
    <div className="loader">
      <PulseBubbleLoader {...loaderProps} />
    </div>
  );
}

export default Loader;