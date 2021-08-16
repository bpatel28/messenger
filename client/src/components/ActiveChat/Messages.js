import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, otherUserLastRead = "1" } = props;

  const otherUserLastReadMessage = findOtherUserLastReadMessage(
    messages,
    otherUserLastRead,
    otherUser
  );

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            read={
              otherUserLastReadMessage &&
              otherUserLastReadMessage.id === message.id
            }
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

const findOtherUserLastReadMessage = (
  messages,
  otherUserLastRead,
  otherUser
) => {
  const readMessages = messages.filter(
    (message) =>
      Date.parse(message.updatedAt) <= Date.parse(otherUserLastRead) &&
      message.senderId !== otherUser.id
  );
  if (readMessages && readMessages.length > 0) {
    return readMessages[readMessages.length - 1];
  }
  return null;
};

export default Messages;
