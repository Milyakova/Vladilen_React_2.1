import React from "react";

const Qualitie = ({ color, name }) => {
  return (
    <div
      className={"badge rounded-pill m-2 bg-" + color}
      style={{ fontSize: "15px" }}
    >
      {name}
    </div>
  );
};

export default Qualitie;
