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
const { User, Postare, Comment } = require("./schemadefinition");
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
//Express settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Cors Settings
app.use(
  cors({
    origin: "http://localhost:3001", // <-- location of the react app were connecting to
    credentials: true,
  })
);
//Passport settings
app.use(passport.initialize());
app.use(passport.session());
//Protected routing
function Authentication(sessUser) {
  if (sessUser) {
    return true;
  } else {
    return false;
  }
}
//---------------------------------------------------------------END OF MIDDLEWARE---------------------------------------------------------------------//

//----------------------------------------------------------------Routes-------------------------------------------------------------------------------//
//Login route
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
//Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("USERCOOKIE"); // clears cookie containing expired sessionID
    res.send("Logged out successfully");
  });
}); //Logout

//User routes
app.use("/createUser", require("./Routes/userRoutes.js"));
app.put("/updateUser", require("./Routes/userRoutes.js"));
app.get("/deleteUser", require("./Routes/userRoutes.js"));
app.get("/getUser", require("./Routes/userRoutes.js"));
app.get("/getPublicUser", require("./Routes/userRoutes.js"));

//Post routes
app.use("/createPost", require("./Routes/postRoutes.js"));
app.use("/updatePost", require("./Routes/postRoutes.js"));
app.use("/deletePost", require("./Routes/postRoutes.js"));
app.use("/getPosts", require("./Routes/postRoutes.js"));

//Comment routes
app.use("/commentPost", require("./Routes/postRoutes.js"));
app.use("/getComment", require("./Routes/postRoutes.js"));
app.use("/deleteComment", require("./Routes/postRoutes.js"));

//Protected Home page
app.get("/", async (req, res) => {
  if (Authentication(req.session.user)) {
    res.json({ msg: "Logat", user: req.session.user });
  } else {
    res.send("Ne-Logat");
  }
});

app.listen(port, () => console.log(`Application running on port ${port}`));
//----------------------------------------------------------------End of Routes------------------------------------------------------------------------//
