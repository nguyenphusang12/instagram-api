const Post = require("../models/Post");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
class PostController {
  //[GET] /api/posts/
  //@desc get posts
  async getPosts(req, res) {
    try {
      const user = await User.findById(req.userId).select("friends");
      let userPosts = await Post.find({ user: req.userId }).populate("user", [
        "fullName",
        "avt",
        "username",
      ]);

      const friendsPost = await Promise.all(
        user.friends.map((fr) =>
          Post.find({ user: fr }).populate("user", [
            "fullName",
            "avt",
            "username",
          ])
        )
      );

      const allPosts = userPosts.concat(...friendsPost);

      if (allPosts) {
        allPosts.sort((b, a) => a.createdAt - b.createdAt);
        res.json({ success: true, posts: allPosts });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
  //[GET] /api/posts/:userId
  // get post by id
  async getPostsById(req, res) {
    const userId = req.params.userId;
    if (userId) {
      try {
        const posts = await Post.find({ user: userId }).populate("user", [
          "fullName",
          "username",
          "avt",
        ]);
        if (posts) {
          return res.status(200).json({ success: true, posts });
        }
      } catch (error) {
        return res.status(500).json({ success: false, error: error });
      }
    }
  }
  //[POST] /api/posts/create
  //@desc create a post
  async postCreate(req, res) {
    const { file, description } = req.body;
    try {
      const newPost = new Post({
        file,
        description,
        user: req.userId,
      });
      await newPost.save();
      const infoUser = await User.findById(req.userId).select([
        "avt",
        "fullName",
      ]);
      newPost.user = infoUser;

      res.json({ success: true, post: newPost });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
  //[DELETE] /api/posts/:id
  //@desc delete a post
  async delete(req, res) {
    const postId = req.params.id;
    try {
      const postDelete = await Post.findOneAndDelete({ _id: postId });
      res.json({ message: "Deleted", success: true, post: postDelete });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
  //[PUT] /api/posts/:id
  //@desc update a post
  async update(req, res) {
    try {
      await Post.findOneAndUpdate({ _id: req.params.id }, req.body);
      const newPost = await Post.findById(req.params.id).populate("user", [
        "avt",
        "fullName",
      ]);
      res.json({
        message: "Update successfully",
        success: true,
        post: newPost,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
  //[POST] /api/posts/like
  //@desc like  post
  async likePost(req, res) {
    try {
      const post = await Post.findById(req.body.postId);
      if (!post.likes.includes(req.userId)) {
        await post.updateOne({ $push: { likes: req.userId } });
        res.json({ success: true, message: "add" });
      } else {
        await post.updateOne({ $pull: { likes: req.userId } });
        // await post.updateOne({
        //   likes: post.likes.filter((l) => l !== req.userId),
        // });
        res.json({ success: true, message: "delete", post });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  // [POST] /api/posts/comment
  //@desc comment post
  async commentPost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.body.postId },
        { $push: { comments: req.body.infoUserComment } },
        { new: true }
      );

      res.json({ success: true, comment: post.comments });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  //[GET] /api/posts/all
  //@desc get all posts
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find().populate("user", [
        "fullName",
        "avt",
        "username",
      ]);
      res.json({ success: true, posts });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
}
module.exports = new PostController();
