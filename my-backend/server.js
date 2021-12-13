const express=require('express');
const request=require('request');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const bcrypt = require("bcryptjs");
const passport=require('passport');
const passportLocal=require('passport-local').Strategy;
const session=require('express-session');
const MongoDBSession=require('connect-mongodb-session')(session);
const cors=require('cors');
const {User} = require('./schemaDefinition');
require('./passportConfig')(passport);
app=express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port=3001;
mongoURI="mongodb://localhost:27017/users"
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );

  const store= new MongoDBSession({
     uri:mongoURI,
     collection:'mySessions'
  })
  app.use(
    session({
      name:"USERCOOKIE",
      secret: "secretcode",
      resave: false,
      saveUninitialized: false,
      store:store,
      cookie:{
        maxAge: 1000 * 60 * 60 * 3,
        sameSite: false,
        secure: false
      }
    })
  );
  app.use(cookieParser("secretcode"));
  app.use(passport.initialize());
  app.use(passport.session());
  require("./passportConfig")(passport);



mongoose.connect(mongoURI,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{console.log("Connection open!")}).catch(err=>{console.log(err)});

app.post('/createUser',async (req,res)=>{
    User.findOne({username:req.body.username}, async (err, doc)=>{
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if(!doc){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser=new User({username:req.body.username,password:hashedPassword});
    await newUser.save();
    console.log("User inserted in ur mother");
        }
       
    })
    res.redirect('/login');
})

app.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
      if(err) throw err;
      if(!user) res.send("No user exists");
      else{
        req.logIn(user,err=>{
          if(err) throw err;
          //console.log(user);
          const usersession={username:user.username,id:user.id};
          req.session.user=usersession;
          console.log(req.session.user);
          res.send({msg:"User susccessfully logged in", usersession})
        })
      }
    })(req,res,next)
})

app.get('/user',(req,res)=>{

})

app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("USERCOOKIE"); // clears cookie containing expired sessionID
    res.send("Logged out successfully");
  });
});

app.get("/authchecker", (req, res) => {
  
});

app.get('/',async (req,res)=>{
  const sessUser = req.session.user;
  if (sessUser) {
    return res.json({ msg: " Authenticated Successfully", sessUser });
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
});

app.listen(port,()=>console.log(`Example running on port ${port}`));