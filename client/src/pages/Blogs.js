import axios from "axios";
import React, { useEffect, useState } from "react";
import Blogcard from "../components/Blogcard";

const Blogs = () => {
  const [blogs, setblogs] = useState([]);

  // Get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blogs");
      console.log(data); // Log the data to check its structure
      if (data?.success) {
        setblogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="main_blog_page">
      hey
      <>
        {blogs &&
          blogs.map((blog) => (
            <Blogcard
              key={blog._id} // Ensure each Blogcard has a unique key
              blog_image={blog.image}
              blog_title={blog.title}
              blog_Desc={blog.description}
            />
          ))}
      </>
    </div>
  );
};

export default Blogs;

/*import axios from "axios";
import React, { useEffect, useState } from "react";
import Blogcard from "../components/Blogcard";

const Blogs = () => {
  const [blogs, setblogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blogs");
      if (data?.success) {
        setblogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div className="main_blog_page">
      hey
      <>
        {blogs &&
          blogs.map(({ blog }) => (
            <Blogcard
              blog_image={blog.image}
              blog_title={blog.title}
              blog_Desc={blog.description}
            />
          ))}
      </>
    </div>
  );
};

export default Blogs;*/
