import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookmark,
  onDelete,
  ...rest
}) => {
  const columns = {
    count: {},
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    professions: {
      path: "profession.name",
      name: "Профессия"
    },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился, раз"
    },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <BookMark
          status={user.bookmark}
          onClick={() => onToggleBookmark(user._id, user.bookmark)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className="btn btn-danger">
          delete
        </button>
      )
    }
  };
  return (
    //
    //   <Table
    //     onSort={onSort}
    //     selectedSort={selectedSort}
    //     columns={columns}
    //     data={users}
    //   />
    //   {/* <TableHeader {...{ onSort, selectedSort, columns }} />
    //   <TableBody {...{ columns, data: users }} /> */}
    //

    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};
export default UserTable;
UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleSort: PropTypes.func,
  selectedSort: PropTypes.object,
  onSort: PropTypes.func.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};