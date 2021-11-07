import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
const QualitiesList = ({ qualities }) => {
  return (
    <>
      {!Array.isArray(qualities) &&
        Object.keys(qualities).map((quality) => (
          <Qualitie key={qualities[quality]._id} {...quality} />
        ))}
      {qualities.map((qual) => (
        <Qualitie key={qual._id} {...qual} />
      ))}
    </>
  );
};

export default QualitiesList;

QualitiesList.propTypes = {
  qualities: PropTypes.array
};
