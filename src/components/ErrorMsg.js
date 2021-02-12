import React from "react";

const ErrorMsg = ({ err }) => {
  if (err) {
    return (
      <div style={{ backgroundColor: "red" }}>
        <h1 style={{ color: "white" }}>{err}</h1>
      </div>
    );
  }
  if (err === "") {
    return null;
  }
};

export default ErrorMsg;
