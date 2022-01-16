const express = require("express");
const { User } = require("../schemadefinition");
const router = express.Router();
const bcrypt = require("bcrypt");

function Authentication(sessUser) {
  if (sessUser) {
    return true;
  } else {
    return false;
  }
}
//Delete route
app.get("/deleteUser", async (req, res) => {
  if (Authentication(req.session.user)) {
    const id = req.session.user.id;
    User.findOneAndRemove({ _id: id }, function (err, result) {
      if (err) throw err;
      req.session.destroy();
      res.clearCookie("USERCOOKIE");
      res.redirect("/");
    });
  } else {
    res.status(400).send("Not authorized to access this page");
  }
});

//Update route
app.put("/updateUser", async (req, res) => {
  const pass = req.body.oldpassword;
  const userToUpdate = await User.findOne({ _id: req.session.user.id });
  bcrypt.compare(pass, userToUpdate.password, async (err, result) => {
    var Result = result;
    if (err) throw err;
    if (Result == true) {
      const hashedPassword = await bcrypt.hash(req.body.newpassword, 10);
      await User.findByIdAndUpdate(
        { _id: req.session.user.id },
        { password: hashedPassword }
      );
      req.session.destroy();
      res.send("Password was changed successfully");
    } else {
      res.send("Does not match");
    }
  });
});

//User registration route
app.post("/createUser", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); //password encryption
      const newUser = new User({
        username: req.body.username, //taking the username that has been introduced in the frontend form
        password: hashedPassword,
        email: req.body.email,
        date: req.body.date,
        role: "Slave",
      });
      await newUser.save(); //introducing the user into the database
      res.send("User Created");
    }
  });
}); //User registration route
app.get("/getUser", async (req, res) => {
  if (Authentication(req.session.user)) {
    const user = await User.findById(req.session.user.id);
    console.log(user);
    res.json({
      username: user.username,
      id: user.id,
      email: user.email,
      date: user.date,
    });
  } else {
    res.status(400).send("Not authorized to access this page");
  }
});
app.post("/getPublicUser", async (req, res) => {
  const foundUser = await User.findById(req.body.userID);
  res.json(foundUser);
});

module.exports = router;
