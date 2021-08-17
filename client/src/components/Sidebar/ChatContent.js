import React from "react";
import { Chip, Box, Typography } from "@material-ui/core";
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
  vibleChip: {
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

  const notificationMessage = (msgCount) => {
    if (msgCount > 99) {
      return "99+";
    } else if (msgCount > 0) {
      return msgCount;
    } else {
      return "";
    }
  };

  const { conversation } = props;
  const { latestMessageText, otherUser, myUnreadMessageCount } = conversation;
  const message = notificationMessage(myUnreadMessageCount);
  const chipStyle = message ? classes.vibleChip : classes.hiddenChip;
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      <Chip
        size="small"
        className={chipStyle}
        label={message}
        color="primary"
      />
    </Box>
  );
};

export default ChatContent;
