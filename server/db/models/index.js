const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Group = require("./group");
const UserGroup = require("./user_group");

// associations

User.hasMany(Conversation);

Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

Group.belongsTo(Conversation);

UserGroup.belongsTo(Group);
Group.hasMany(UserGroup);

UserGroup.belongsTo(User);
User.hasMany(UserGroup);

module.exports = {
  User,
  Conversation,
  Message,
  Group,
};
