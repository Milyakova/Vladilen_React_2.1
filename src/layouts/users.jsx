import React from "react";
import { useParams } from "react-router";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/editUserPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <>
      <UserProvider>
        {userId && edit ? (
          <EditUserPage userId={userId} />
        ) : userId ? (
          <UserPage userId={userId} />
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;
