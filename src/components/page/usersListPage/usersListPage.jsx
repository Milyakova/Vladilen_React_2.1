import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/userTable";
import _ from "lodash";
import Search from "../../common/form/search";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 8;
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [searchingName, setSearchingName] = useState("");

  const { users } = useUser();
  const { isLoading: professionsLoading, professions } = useProfession();

  const handleDelete = (userId) => {
    // const updatedUsers = users.filter((item) => item._id !== userId);
    // setUsers(updatedUsers);
    console.log(userId);
  };

  const handleToggleBookmark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    console.log(newArray);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchingName]);

  const handleItemSelect = (item) => {
    if (searchingName !== "") setSearchingName("");
    setSelectedProf(item);
  };
  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchingName(target.value);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    let filteredUsers = [];

    if (selectedProf) {
      filteredUsers = users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      );
    } else {
      filteredUsers = users;
    }

    if (searchingName.value) {
      filteredUsers = users.filter((user) => {
        const r = searchingName.value;
        const regEx = new RegExp(r, "gi");
        return regEx.test(JSON.stringify(user.name));
      });
    }

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <>
        <div className="d-flex">
          {professions && !professionsLoading && (
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
            <form>
              <Search
                value={searchingName.value}
                onChange={handleSearchQuery}
              />
            </form>

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
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="spinner-border m-5" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

UsersListPage.propTypes = {
  users: PropTypes.array,
  index: PropTypes.number
};

export default UsersListPage;
