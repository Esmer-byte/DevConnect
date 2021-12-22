//Start of requirements
const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passportLocal = require("passport-local").Strategy;
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { User, Postare } = require("./schemadefinition");
//End of requirements

//Global variables
app = express();
const port = 3000; // <- Application port
const mongoURI = "mongodb://localhost:27017/users"; // <- Database location
//================================================================END OF GLOBAL=========================================================================================//

//MIDDLEWARE
require("./passportConfig")(passport);
const store = new MongoDBSession({
  uri: mongoURI,
  collection: "mySessions",
});

//Establish connection with the Database
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //the MongoDB driver will try to find a server to send any given operation to, and keep retrying for serverSelectionTimeoutMS milliseconds.
  })
  .then(() => {
    console.log("Connection open!");
  })
  .catch((err) => {
    console.log(err);
  });
// End of establish connection with the Database

// Cookie Settings
app.use(
  session({
    name: "USERCOOKIE", //name to be put in "key" field in postman etc
    secret: "secretcode", //secret that will be checked for authorization
    resave: false,
    saveUninitialized: false, //https://stackoverflow.com/questions/40381401
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
      sameSite: false, //The SameSite attribute of the Set-Cookie HTTP response header allows you to declare if your cookie should be restricted to a first-party or same-site context.
      secure: false,
    },
  })
);
app.use(cookieParser("secretcode"));
// End of Cookie Settings

app.use(express.json()); //Express settings
app.use(express.urlencoded({ extended: true })); //Express settings

app.use(
  cors({
    origin: "http://localhost:3001", // <-- location of the react app were connecting to
    credentials: true,
  })
); // Cors Settings

app.use(passport.initialize()); // Passport settings
app.use(passport.session()); // Passport settings

function Authentication(sessUser) {
  if (sessUser) {
    return true;
  } else {
    return false;
  }
}
//---------------------------------------------------------------END OF MIDDLEWARE---------------------------------------------------------------------//

//Routes

//================================================================USER ROUTES================================================================
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log(req.user);
        //Session authentication
        const sessUser = {
          id: user.id,
          username: user.username,
          email: user.email,
          date: user.date,
        };
        req.session.user = sessUser; // Auto saves session data in mongo store
        res.send({ msg: "User susccessfully logged in", sessUser });
        //End of session authentication
      });
    }
  })(req, res, next);
}); // Route for Login

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("USERCOOKIE"); // clears cookie containing expired sessionID
    res.send("Logged out successfully");
  });
}); //Logout

//Delete route
app.get("/deleteUser", async (req, res) => {
  const id = req.session.user.id;
  User.findOneAndRemove({ _id: id }, function (err, result) {
    if (err) throw err;
    req.session.destroy();
    res.clearCookie("USERCOOKIE");
    res.redirect("/");
  });
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
  }
});
//============================================================================END OF USER ROUTES=====================================================================

//============================================================================POST ROUTES============================================================================

//Create Post
app.post("/createPost", async (req, res, next) => {
  const date = new Date();
  const postare = new Postare({
    ownerID: req.session.user.username,
    previewURL: "",
    descriptionBody: req.body.description,
    reactions: {
      likes: [],
      hearts: [],
      wows: [],
    },
    date: date,
  });
  await postare.save();
  res.send("post created");
});

//Update Post
app.put("/updatePost", async (req, res, next) => {
  console.log(req.body);
  switch (req.body.reaction) {
    case 1:
      Postare.findOneAndUpdate({ownerID:req.body.postOwner}, {
        $push: { reactions: { likes: req.body.owner } },
      });
      break;
    case 2:
      Postare.findOneAndUpdate({ownerID:req.body.postOwner}, {
        $push: { reactions: { hearts: req.body.owner } },
      });
      break;
    case 3:
      Postare.findOneAndUpdate({ownerID:req.body.postOwner}, {
        $push: { reactions: { wows: req.body.owner } },
      });
      break;
  }

});

//Get Posts Route
app.get("/getPosts", async (req, res) => {
  const posts = await Postare.find();
  res.status(200).send(posts);
});
//================================================================END OF POST ROUTES===================================================================

//Protected Home page
app.get("/", async (req, res) => {
  if (Authentication(req.session.user)) {
    res.json({ msg: "Logat", user: req.session.user });
  } else {
    res.send("Ne-Logat");
  }
}); //Protected Home page

app.listen(port, () => console.log(`Example running on port ${port}`));
//----------------------------------------------------------------End of Routes----------------------------------------------------------------
