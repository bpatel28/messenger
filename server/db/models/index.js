const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationLastRead = require("./conversation_last_read");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
ConversationLastRead.belongsTo(Conversation);
Conversation.hasMany(ConversationLastRead);
ConversationLastRead.belongsTo(User);
User.hasMany(ConversationLastRead);

module.exports = {
  User,
  Conversation,
  Message,
  ConversationLastRead,
};
