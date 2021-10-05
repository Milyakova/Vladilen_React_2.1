import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <Qualitie key={quality._id} {...quality} />
      ))}
    </>
  );
};

export default QualitiesList;

QualitiesList.propTypes = {
  qualities: PropTypes.array
};
