import React from "react";

const BookMark = ({ status, onToggleBookmark, _id }) => {
  if (status === "Marked") {
    return (
      <i
        onClick={() => onToggleBookmark(_id, status)}
        className="bi bi-bookmark-fill"
      ></i>
    );
  } else
    return (
      <i
        onClick={() => onToggleBookmark(_id, status)}
        className="bi bi-bookmark"
      ></i>
    );
};

export default BookMark;
