import React from "react";
import { useParams } from "react-router";
import UserCard from "../components/userCard";
import UsersList from "../components/usersList";
const Users = () => {
  const params = useParams();
  const { userId } = params;
  return <>{userId ? <UserCard userId={userId} /> : <UsersList />}</>;
};

export default Users;
