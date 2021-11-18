const express=require('express');
const request=require('request');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const bcrypt = require("bcryptjs");
const passport=require('passport');
const passportLocal=require('passport-local').Strategy;
const session=require('express-session');
const bodyParser=require('body-parser');
const cors=require('cors');

const {User}= require('./schemaDefinition');

app=express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port=3001;
app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app were connecting to
      credentials: true,
    })
  );
  app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(cookieParser("secretcode"));
  app.use(passport.initialize());
  app.use(passport.session());
  //require("./passportConfig")(passport);


mongoose.connect('mongodb://localhost:27017/users',{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{console.log("Connection open!")}).catch(err=>{console.log(err)});

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
    
})

app.get('/',(req,res)=>
    res.send("Hello World")
);

app.listen(port,()=>console.log(`Example running on port ${port}`));