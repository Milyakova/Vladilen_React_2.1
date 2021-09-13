import React from "react";
import User from "./user";

const Users = ({ onDelete, onToggleBookmark, users }) => {
  return (
    <React.Fragment>
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
          {users.map((user, i) => (
            <User
              key={user._id}
              index={i}
              {...user}
              onDelete={onDelete}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Users;
