const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//GET ALL BLOGS
exports.getAllBlogController = async (req, res) => {
  try {
    const blog = await blogModel.find({});
    if (!blog) {
      return res.status(201).send({
        success: false,
        message: "No Blog Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blog.length,
      message: "All Blogs Lists",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while geetting blogs",
      error,
    });
  }
};

//CRAETE BLOG
/*exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validation if not exisiting user
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "No account found first create account and send blog",
      });
    }
    const newBlog = new blogModel({ title, description, image });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(200).send({
      success: true,
      message: "Blog is saved",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating blog",
      error,
    });
  }
};*/
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    // Validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const exisitingUser = await userModel.findById(user);

    // Validation if no existing user
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "No account found. First create an account and send the blog.",
      });
    }

    const newBlog = new blogModel({ title, description, image });
    await newBlog.save();

    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save();

    return res.status(200).send({
      success: true,
      message: "Blog is saved",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating blog",
      error,
    });
  }
};

//UPDATE BLOG
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog is updated sucessfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating blog",
      error,
    });
  }
};

//GET BLOG BY ID
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(401).send({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog find by id",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting blog by id",
      error,
    });
  }
};

//DELETE BLOG
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findOneAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Deleteion of blog complete",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Blog",
      error,
    });
  }
};

//get || user blog
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "User Blog not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs found",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error User Blog not found",
    });
  }
};
