import React from "react";

function bgcolor(props) {
  return (
    <div style={{ backgroundColor: "cyan", padding: "20px" }}>
      {props.children}
    </div>
  );
}

export default bgcolor;