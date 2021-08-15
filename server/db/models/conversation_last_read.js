const db = require("../db");
const Sequelize = require("sequelize");

const ConversationLastRead = db.define("conversation_last_read", {
  lastRead: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

ConversationLastRead.findLastRead = async function (conversationId, userId) {
  const lastRead = await ConversationLastRead.findOne({
    where: {
      conversationId,
      userId,
    },
  });

  return lastRead;
};

ConversationLastRead.updateInsert = async function (conversationId, senderId) {
  convoLastRead = await ConversationLastRead.findLastRead(
    conversationId,
    senderId
  );

  let lastRead;
  if (convoLastRead) {
    const result = await ConversationLastRead.update(
      {
        lastRead: Sequelize.fn("NOW"),
      },
      {
        where: { id: convoLastRead.id },
        returning: true,
        plain: true,
      }
    );
    for (let i = 0; i < result.length; ++i) {
      if (result[i]) {
        lastRead = result[i].toJSON();
        break;
      }
    }
  } else {
    const result = await ConversationLastRead.create(
      {
        conversationId,
        userId: senderId,
      },
      {
        returning: true,
        plain: true,
      }
    );

    lastRead = result.toJSON();
  }

  return lastRead;
};

module.exports = ConversationLastRead;
