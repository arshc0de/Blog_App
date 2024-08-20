import React from "react";
import "../css/Blogcard.css";

function Blogcard({ blog_image, blog_title, blog_Desc }) {
  const profile_image =
    "https://media.licdn.com/dms/image/D5603AQEQ4rxNT5luAA/profile-displayphoto-shrink_200_200/0/1720069812051?e=2147483647&v=beta&t=htF_l6fBl9hzl_BWRmxxfXLeB79BzM7BEQDLdtFYy6E";
  return (
    <div className="main_card_blog">
      <div className="card_head">
        <img
          src={profile_image}
          alt="user profile"
          className="user_profile_img"
        />
        <div>
          <p className="user_name">samia martin</p>
          <p className="Blog_data_time">15 Min ago</p>
        </div>
      </div>
      <div className="image_space">
        <img src={blog_image} alt="main pic" className="blog_image" />
      </div>
      <div>
        <p className="blog_head">{blog_title}</p>
        <p className="blog_desc">{blog_Desc}</p>
      </div>
    </div>
  );
}

export default Blogcard;

/*import React from "react";
import "../css/Blogcard.css";

function Blogcard({ blog_image, blog_title, blog_Desc }) {
  const profile_image =
    "https://media.licdn.com/dms/image/D5603AQEQ4rxNT5luAA/profile-displayphoto-shrink_200_200/0/1720069812051?e=2147483647&v=beta&t=htF_l6fBl9hzl_BWRmxxfXLeB79BzM7BEQDLdtFYy6E";
  return (
    <div className="main_card_blog">
      <div className="card_head">
        <img
          src={profile_image}
          alt="user profile"
          className="user_profile_img"
        />
        <div>
          <p className="user_name">samia martin</p>
          <p className="Blog_data_time">15 Min ago</p>
        </div>
      </div>
      <div className="image_space">
        <img src={blog_image} alt="main pic" className="blog_image" />
      </div>
      <div>
        <p className="blog_head">{blog_title}</p>
        <p className="blog_desc">{blog_Desc}</p>
      </div>
    </div>
  );
}

export default Blogcard;*/
