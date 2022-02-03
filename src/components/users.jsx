import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../API";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 4;

  useEffect(() => {
    console.log("send request", API.professions);
    API.professions.fetchAll().then((data) => {
      console.log("data", data);
      setProfessions([...data]);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleItemSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    console.log("page", pageIndex);
    setCurrentPage(pageIndex);
  };

  const filteredUsers = selectedProf
    ? allUsers.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : allUsers;

  const count = filteredUsers.length;
  const usersCrop = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf(undefined);
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex-flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleItemSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt2" onClick={clearFilter}>
            Очистить все
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
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
              {usersCrop.map((user, index) => (
                <User key={user._id} {...rest} {...user} index={index} />
              ))}
            </tbody>
          </table>
        )}

        <div className="d-flex justify-content-center">
          <Pagination
            currentPage={currentPage}
            itemsCount={count}
            pageSize={4}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
Users.propTypes = {
  allUsers: PropTypes.array,
  users: PropTypes.array,
  index: PropTypes.number
};

export default Users;
