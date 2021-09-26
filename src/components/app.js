import React, { useState } from "react";
import Users from "./users";
import api from "../API/";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((item) => item._id !== userId);
    setUsers(updatedUsers);
  };

  const handleToggleBookmark = (userId, status) => {
    if (status === "Unmarked") {
      status = "Marked";
    } else {
      status = "Unmarked";
    }
    const updatedBookmark = users.map((item) => {
      console.log("bookmark itewm", item);
      if (item._id === userId) {
        item.status = status;
        console.log(item);
      }
      return item;
    });

    setUsers(updatedBookmark);
    console.log(users);
  };

  return (
    <div>
      <Users
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
        users={users}
      />
    </div>
  );
}
export default App;