import React from "react";
import { AlertCircle } from "react-feather";
import "../css/showError.css";

const ShowError = (prop) => {
  if (typeof prop.props != "undefined") {
    return (
      <div className="error">
        <p className="error__txt">{prop.props}</p>
        <AlertCircle className="error__circle" />
      </div>
    );
  }
};

export default ShowError;
