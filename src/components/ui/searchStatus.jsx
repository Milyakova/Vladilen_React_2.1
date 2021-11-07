import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    if (number === 0) {
      return (
        <span className={"badge m-2 bg-danger"}>Никто с тобой не тусанет</span>
      );
    }

    if (
      [2, 3, 4].some((el) => {
        const booly = el === number % 10 && Math.trunc(number / 10) !== 1;
        return booly;
      })
    ) {
      return (
        <span className={"badge bg-primary"}>
          {number} человека тусанут с тобой сегодня
        </span>
      );
    } else {
      return (
        <span className={"badge bg-primary"}>
          {number} человек тусанет с тобой сегодня
        </span>
      );
    }
  };
  return (
    <React.Fragment>
      <h2>{renderPhrase(length)}</h2>
    </React.Fragment>
  );
};
SearchStatus.propTypes = {
  length: PropTypes.number
};

export default SearchStatus;
