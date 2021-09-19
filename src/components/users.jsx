import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const Users = ({ users: allUsers, ...rest }) => {
  const count = allUsers.length;
  const pageSize = 4;
  const handlePageChange = (pageIndex) => {
    console.log("page", pageIndex);
    setCurrentPage(pageIndex);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const users = paginate(allUsers, currentPage, pageSize);
  return (
    <React.Fragment>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Кол-во встреч</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <User key={user._id} {...rest} {...user} index={index} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        currentPage={currentPage}
        itemsCount={count}
        pageSize={4}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};
Users.propTypes = {
  allUsers: PropTypes.array,
  users: PropTypes.array,
  index: PropTypes.number
};

export default Users;
