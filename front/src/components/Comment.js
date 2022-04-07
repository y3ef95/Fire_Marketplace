import React from "react";
import { Avatar, Comment as AntdComment, Tooltip } from "antd";
import moment from "moment";

export default function Comment({ comment }) {
  const {
    author: { username, avatar_url },
    message,
    created_at,
  } = comment;
  return (
    <AntdComment
      author={username}
      avatar={<Avatar src={avatar_url} alt={username} />}
      content={message}
      datetime={
        <Tooltip title={moment().format(created_at)}>
          <span>{moment(created_at).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}
