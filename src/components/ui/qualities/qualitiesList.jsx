import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const QualitiesList = ({ ids }) => {
  return (
    <>
      {ids.map((qual) => (
        <Qualitie key={qual} id={qual} />
      ))}
    </>
  );
};

export default QualitiesList;

QualitiesList.propTypes = {
  ids: PropTypes.array
};
