import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../API";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import _ from "lodash";
import { useParams } from "react-router";
import UserCard from "./userCard";

const Users = () => {
  const params = useParams();
  const { userId } = params;
  console.log("USERID-1", userId);

  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 4;
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

  useEffect(() => {
    console.log("send request users", api.users);
    api.users.fetchAll().then((data) => {
      console.log("DATA", data);
      setUsers(data);
    });
  }, []);

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((item) => item._id !== userId);
    setUsers(updatedUsers);
  };

  const handleToggleBookmark = (userId, status) => {
    if (!status || status === undefined) {
      status = true;
    } else {
      status = false;
    }
    const updatedBookmark = users.map((item) => {
      if (item._id === userId) {
        item.bookmark = status;
      }
      return item;
    });

    setUsers(updatedBookmark);
  };

  useEffect(() => {
    console.log("send request PROFESSIONS", api.professions);
    api.professions.fetchAll().then((data) => {
      console.log("data prof", data);
      setProfessions(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleItemSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf(undefined);
    };
    return (
      <>
        {userId && <UserCard userId={userId} />}
        {!userId && (
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
                <UserTable
                  users={usersCrop}
                  onSort={handleSort}
                  selectedSort={sortBy}
                  onDelete={handleDelete}
                  onToggleBookmark={handleToggleBookmark}
                />
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
        )}
      </>
    );
  }

  return (
    <div className="spinner-border m-5" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  index: PropTypes.number
};

export default Users;
