import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    getUsers();
    // return setLoading(true);
  }, []);

  useEffect(() => {
    toast(error);
    setError(null);
  }, [error]);

  async function getUsers() {
    try {
      const { content } = await userService.get();
      setUsers(content);

      setLoading(false);
    } catch (error) {
      errorCatcher();
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users];
      const indexUser = newUsers.findIndex(
        (user) => user._id === currentUser._id
      );
      newUsers[indexUser] = currentUser;
      setUsers(newUsers);
    }
  }, [currentUser]);

  function getUserById(userId) {
    // if (!isLoading) {
    //   console.log("userId", userId);
    //   console.log("USERS IN MOUNTED", users);
    return users.find((u) => u._id === userId);
  }

  return (
    <UserContext.Provider value={{ users, getUserById, isLoading }}>
      {!isLoading ? children : "Loading..."}
    </UserContext.Provider>
  );
};

export default UserProvider;
UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
