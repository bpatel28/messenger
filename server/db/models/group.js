const db = require("../db");
const Sequelize = require("sequelize");

const Group = db.define("group", {
  name: {
    type: Sequelize.STRING,
  },
  photoUrl: {
    type: Sequelize.STRING,
  },
});

module.exports = Group;