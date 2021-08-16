import React, { useState, useEffect } from "react";
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
  previewDarkText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#000000",
    letterSpacing: -0.17,
  },
  visibleChip: {
    maarginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(0),
    display: "flex",
  },
  hiddenChip: {
    maarginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(0),
    display: "none",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const [unreadCount, setCount] = useState("");
  const [chipStyle, setChipStyle] = useState(classes.hiddenChip);
  useEffect(() => {
    const count = countUnreadMessages(conversation);
    if (unreadCount !== count) {
      setCount(count);
    }
    if (unreadCount !== 0) {
      setChipStyle(classes.visibleChip);
    } else {
      setChipStyle(classes.hiddenChip);
    }
  }, [
    conversation,
    unreadCount,
    chipStyle,
    classes.visibleChip,
    classes.hiddenChip,
  ]);

  const [latestMsgStyle, setLatestMsgStyle] = useState(classes.previewText);
  useEffect(() => {
    if (unreadCount !== 0) {
      setLatestMsgStyle(classes.previewDarkText);
    } else {
      setLatestMsgStyle(classes.previewText);
    }
  }, [unreadCount, classes.previewDarkText, classes.previewText]);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={latestMsgStyle}>{latestMessageText}</Typography>
      </Box>
      <Chip
        size="small"
        className={chipStyle}
        label={unreadCount < 99 ? unreadCount : "99+"}
        color="primary"
      />
    </Box>
  );
};

const countUnreadMessages = (conversation) => {
  const { messages, myLastRead = "1", otherUser } = conversation;
  const unreadMessages = messages.filter(
    (message) =>
      Date.parse(message.updatedAt) > Date.parse(myLastRead) &&
      message.senderId === otherUser.id
  );
  return unreadMessages.length;
};

export default ChatContent;
