const express = require("express");

const router = express.Router();

const postController = require("../app/controllers/PostController");

const vertifyToken = require("../app/middlewares/verifyToken");

// [GET] /api/posts/all
// @desc get posts
router.get("/all", vertifyToken, postController.getAllPosts);

//[GET] /api/posts/:userId
// get post by id
router.get("/:userId", vertifyToken, postController.getPostsById);

// [GET] /api/posts/
// @desc get posts
router.get("/", vertifyToken, postController.getPosts);

//[POST] /api/posts/create
//@desc create a post
router.post("/create", vertifyToken, postController.postCreate);

//[POST] /api/posts/like
//@desc like post
router.post("/like", vertifyToken, postController.likePost);

//[POST] /api/posts/comment
//@desc comment post
router.post("/comment", vertifyToken, postController.commentPost);

//[DELETE] /api/posts/:id
//@desc delete a post
router.delete("/:id", vertifyToken, postController.delete);

//[PUT] /api/posts/:id
//@desc update a post
router.put("/:id", vertifyToken, postController.update);

module.exports = router;
