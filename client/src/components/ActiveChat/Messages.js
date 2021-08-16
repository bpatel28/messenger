import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, otherUserLastRead = "1" } = props;

  const [lastReadMessageId, setLastReadMessage] = useState(-1);

  useEffect(() => {
    const otherUserLastReadMessage = findOtherUserLastReadMessage(
      messages,
      otherUserLastRead,
      otherUser
    );
    if (
      otherUserLastReadMessage &&
      otherUserLastReadMessage.id !== lastReadMessageId
    ) {
      setLastReadMessage(otherUserLastReadMessage.id);
    }
  }, [lastReadMessageId, messages, otherUserLastRead, otherUser]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            read={lastReadMessageId === message.id}
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
