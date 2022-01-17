import { useProfession } from "../../hooks/useProfession";
import React from "react";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfession();
  const prof = getProfession(id);
  if (!isLoading) {
    return <p className="text-secondary mb-1">{prof.name}</p>;
  } else return "Loading";
};

export default Profession;

Profession.propTypes = {
  id: PropTypes.string
};
