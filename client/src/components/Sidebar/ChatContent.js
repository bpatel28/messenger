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
    color: (props) => props.fontColor,
    letterSpacing: -0.17,
    fontWeight: (props) => props.fontWeight,
  },
  chipStyle: {
    maarginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(0),
    display: (props) => props.visiblity,
  },
}));

const ChatContent = (props) => {
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
  const styleProps = message
    ? { visiblity: "flex", fontWeight: 700, fontColor: "#140e00" }
    : {
        visiblity: "none",
        fontWeight: "fontWeightLight",
        fontColor: "#9CADC8",
      };
  const classes = useStyles(styleProps);

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
        className={classes.chipStyle}
        label={message}
        color="primary"
      />
    </Box>
  );
};

export default ChatContent;
