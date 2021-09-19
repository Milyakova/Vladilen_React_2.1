import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, _id }) => {
  return (
    <div
      className={"badge rounded-pill m-2 bg-" + color}
      style={{ fontSize: "15px" }}
    >
      {name}
    </div>
  );
};
Qualitie.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};
export default Qualitie;
