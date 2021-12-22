const mongoose = require("mongoose");

//Schemas

//User Schema
const userSchema=new mongoose.Schema({
  username:{
      type:String,
      required:true,
      unique:true,
  },
  password:{
      type:String,
      required:true,
  },
  email:{
      type:String,
      required:true,
      unique:true
  },
  date:{
      type:Date,
      required:true,
  },
  posts:{
      type:Array,
  },
  friends:{
      type:Array,
  },
  about:{
      type:String,
  },
  role:{
      type:String,
      required:true,
  },
  profileImage:{
      type:String,
  }
});

//Post Schema
const postSchema=new mongoose.Schema({
  ownerID:{
      type:String,
      required:true,
  },
  previewURL:{
      type:String,
  },
  descriptionBody:{
      type:String,
  },
  reactions:{
      type:Array,
      likes:{
          type:String,
      },
      hearts:{
          type:String,
      },
      wows:{
          type:String,
      }
  },
  date:{
    type:Date,
    required:true,
}
});

//End of Schemas

//Export Variables
const User = mongoose.model("User", userSchema);
const Postare=mongoose.model('Postare',postSchema);
//End of export variables

module.exports = { User, Postare}; //Exports
