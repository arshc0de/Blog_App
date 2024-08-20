const express = require("express");
const {
  getAllBlogController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../Controller/blogController");

//router object
const router = express.Router();

//routes
//GET || all blogs
router.get("/all-blogs", getAllBlogController);

//POST || create blog
router.post("/create-blog", createBlogController);

//put || update
router.put("/update-blog/:id", updateBlogController);

//get || single blog
router.get("/get-blog/:id", getBlogByIdController);

//delete || delete
router.delete("/delete-blog/:id", deleteBlogController);

//get || user blog
router.get("/user-blog/:id", userBlogController);

module.exports = router;
