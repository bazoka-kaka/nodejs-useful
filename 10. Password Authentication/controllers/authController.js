const usersDB = {
  data: require("../model/users.json"),
  setUsers: function (data) {
    this.data = data;
  },
};
const bcrypt = require("bcrypt");

const handleAuth = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = usersDB.data.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // create JWT
    res.json({ success: `User ${user} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleAuth };
