import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
const Pagination = ({ onPageChange, itemsCount, pageSize, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);
  if (pageCount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page, index) => (
          <li
            className={"page-item " + (page === currentPage ? "active" : "")}
            key={index}
          >
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
