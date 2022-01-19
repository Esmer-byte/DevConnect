const express = require("express");
const { Postare, Comment } = require("../schemadefinition");
const router = express.Router();

app.post("/createPost", async (req, res, next) => {
  const date = new Date();
  const postare = new Postare({
    ownerID: req.session.user.id,
    previewURL: "",
    displayName: req.session.user.username,
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
  let ok = true;
  const reactionChecker = await Postare.findOne({
    _id: req.body.postID,
    $or: [
      { likes: req.body.owner },
      { hearts: req.body.owner },
      { wows: req.body.owner },
    ],
  });

  if (reactionChecker != null) {
    if (reactionChecker.likes.indexOf(req.body.owner) > -1) {
      ok = false;
    }
    if (reactionChecker.wows.indexOf(req.body.owner) > -1) {
      ok = false;
    }
    if (reactionChecker.hearts.indexOf(req.body.owner) > -1) {
      ok = false;
    }
  }

  if (ok) {
    switch (req.body.reaction) {
      case 1:
        await Postare.findOneAndUpdate(
          { _id: req.body.postID },
          { $push: { likes: req.body.owner } }
        );
        break;
      case 2:
        await Postare.findOneAndUpdate(
          { _id: req.body.postID },
          { $push: { hearts: req.body.owner } }
        );
        break;
      case 3:
        await Postare.findOneAndUpdate(
          { _id: req.body.postID },
          { $push: { wows: req.body.owner } }
        );
        break;
    }
  } else {
    switch (req.body.reaction) {
      case 1:
        await Postare.findOneAndUpdate(
          { _id: req.body.postID },
          { $pull: { likes: req.body.owner } }
        );
        break;
      case 2:
        await Postare.findOneAndUpdate(
          { _id: req.body.postID },
          { $pull: { hearts: req.body.owner } }
        );
        break;
      case 3:
        await Postare.findOneAndUpdate(
          { _id: req.body.postID },
          { $pull: { wows: req.body.owner } }
        );
        break;
    }
  }
});

app.post("/deletePost", async (req, res) => {
  const deleteId = req.body.postID;
  const { ownerID } = await Postare.findOne({ _id: deleteId });
  if (ownerID == req.session.user.id) {
    Comment.deleteMany({ postareID: deleteId }, function (err, result) {
      if (err) throw err;
    });
    Postare.findOneAndRemove({ _id: deleteId }, function (err, result) {
      if (err) throw err;
      res.redirect("/");
    });
  } else {
    res.status(403).send("Not your post");
  }
});

//Get Posts Route
app.get("/getPosts", async (req, res) => {
  const posts = await Postare.find();
  res.status(200).send(posts);
});
//Get posts for current user
app.get("/getPosts/:id", async (req,res)=>{
  const {id}=req.params;
  res.send(id);
})

//Post Comment Route
app.post("/commentPost", async (req, res) => {
  console.log(req.body.username);
  const comment = new Comment({
    ownerID: req.session.user.id,
    postID: req.body.postID,
    commentContent: req.body.text,
    ownerUsername: req.body.username,
  });
  await comment.save();
  res.send("comment posted");
});
//Get Post Comment Route
app.post("/getComment", async (req, res) => {
  const PostID = req.body.postID;
  const comments = await Comment.find({ postID: PostID });
  res.status(200).send(comments);
});
//Delete Comment Route
app.post("/deleteComment", async (req, res) => {
  console.log("Current user: " + req.session.user.id);
  console.log("Comment owner: " + req.body.owner);
  console.log("Post owner: " + req.body.postOwner);
  if (
    req.session.user.id == req.body.owner ||
    req.session.user.id == req.body.postOwner
  ) {
    await Comment.findOneAndRemove({ _id: req.body.commentID });
    res.status(200);
  } else {
    res.status(403).send("Not your comment");
  }
});

module.exports = router;
