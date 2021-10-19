import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import api from "../API";
import logo from "../user.png";
import { useHistory } from "react-router";

const UserCard = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  });
  const handleClick = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <>
        <div className="card">
          <img src={logo} className="logo" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">ID: {user._id}</li>
            <li className="list-group-item">
              Profession: {user.profession.name}
            </li>
            <li className="list-group-item">
              <QualitiesList qualities={user.qualities} />
            </li>
            <li className="list-group-item">
              completedMeetings: {user.completedMeetings}
            </li>
            <li className="list-group-item">Rate: {user.rate}</li>
          </ul>
        </div>
        <button className="btn btn-primary m-2" onClick={handleClick}>
          Все пользователи
        </button>
      </>
    );
  }
  return (
    <div className="spinner-border m-5" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default UserCard;
UserCard.propTypes = {
  userId: PropTypes.string.isRequired,
  users: PropTypes.array
};
