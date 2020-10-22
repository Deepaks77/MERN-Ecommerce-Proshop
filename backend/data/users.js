const bcrypt = require("bcryptjs");
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Sachin Juneja",
    email: "sachin@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Suresh Raina",
    email: "suresh@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
