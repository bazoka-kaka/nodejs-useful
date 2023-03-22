const usersDB = {
  data: require("../model/users.json"),
  setUsers: function (data) {
    this.data = data;
  },
};
const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const duplicate = usersDB.data.find((person) => person.username === user);
  if (duplicate)
    return res.status(409).json({ message: "Username already taken!" });
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    // store new user
    const newUser = {
      username: user,
      password: hashedPwd,
    };
    usersDB.setUsers([...usersDB.data, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.data)
    );
    res.status(201).json({ message: "User registered." });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { handleNewUser };
