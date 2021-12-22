//Imports
const { User } = require("./schemadefinition");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
//End of Imports

//Encrypted Password Verification
module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  //End of Encrypted Password Verification

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  }); //EXPLANATION NEEDED
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
}; //EXPLANATION NEEDED
