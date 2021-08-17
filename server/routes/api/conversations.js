const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;
      const [lastReadMessage, myUnreadMessageCount] = await Promise.all([
        findLastReadMessage(convoJSON.messages, userId),
        countUnreadMessage(convoJSON.messages, convoJSON.otherUser.id),
      ]);
      convoJSON.otherUser.lastReadMessage = lastReadMessage;
      convoJSON.myUnreadMessageCount = myUnreadMessageCount;

      convoJSON.messages.reverse();
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

const findLastReadMessage = (messages, userId) => {
  return new Promise((resolve) => {
    const readMessages = messages.filter(
      (message) => message.readStatus && message.senderId === userId
    );
    resolve(readMessages.length > 0 ? readMessages[0] : null);
  });
};

const countUnreadMessage = (messages, userId) => {
  return new Promise((resolve) =>
    resolve(
      messages.reduce((count, message) => {
        if (message.senderId === userId && !message.readStatus) {
          count += 1;
        }
        return count;
      }, 0)
    )
  );
};

router.patch("/read/:senderId", async (req, res, next) => {
  try {
    const senderId = req.params.senderId;
    const receiverId = req.user.id; // who made this request.

    // check if conversation exists for sender and receiver.
    const conversation = await Conversation.findConversation(
      senderId,
      receiverId
    );

    if (!conversation) throw Error("Invalid Request!");

    const messages = await Message.update(
      {
        readStatus: true,
      },
      {
        where: {
          senderId: senderId,
          conversationId: conversation.id,
          readStatus: false,
        },
        returning: true,
      }
    );

    res.json({ messages: messages[1] ?? [] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
