import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const unreadCount = countUnreadMessages(conversation);
  const unreadMessage = unreadCount || "";

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
        <span>{unreadMessage}</span>
      </Box>
    </Box>
  );
};

const countUnreadMessages = (conversation) => {
  const { messages, lastRead, otherUser } = conversation;
  const unreadMessages = messages.filter(
    (message) =>
      Date.parse(message.updatedAt) > Date.parse(lastRead) &&
      message.senderId === otherUser.id
  );
  return unreadMessages.length;
};

export default ChatContent;
