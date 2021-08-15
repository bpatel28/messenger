import React from "react";
import { Box, Typography, Chip } from "@material-ui/core";
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
  previewDarkText : {
    fontWeight: "bold",
    fontSize: 12,
    color: "#000000",
    letterSpacing: -0.17,
  },
  chip: {
    maarginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(0)
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const unreadCount = countUnreadMessages(conversation) || "";

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={unreadCount ? classes.previewDarkText : classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadCount ? (
        <Chip size="small" className={classes.chip} label={unreadCount} color="primary" />
      ) : (
        ""
      )}
    </Box>
  );
};

const countUnreadMessages = (conversation) => {
  const { messages, lastRead = '1', otherUser } = conversation;
  const unreadMessages = messages.filter(
    (message) =>
      Date.parse(message.updatedAt) > Date.parse(lastRead) &&
      message.senderId === otherUser.id
  );
  return unreadMessages.length;
};

export default ChatContent;
