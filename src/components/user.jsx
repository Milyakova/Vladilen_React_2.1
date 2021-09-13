import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({
  index,
  onDelete,
  onToggleBookmark,
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  status = "Unmarked",
}) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Qualitie
            key={quality._id}
            name={quality.name}
            color={quality.color}
          />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <Bookmark
          onToggleBookmark={onToggleBookmark}
          _id={_id}
          status={status}
        />
      </td>
      <td>
        <button onClick={() => onDelete(_id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
