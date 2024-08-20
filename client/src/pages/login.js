import React, { useState } from "react";
import "../css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { toast } from "react-toastify";
import lg_svg from "../res/login.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handel input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handel submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: Inputs.email,
        password: Inputs.password,
      });
      if (data.success) {
        dispatch(authActions.login());
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed!");
    }
  };

  return (
    <div className="main_container">
      <div id="register_page">
        <div id="form_side">
          <h1 className="heading_page">Welcome</h1>
          <h1 className="heading_page">back ! Login</h1>
          <form onSubmit={handleSubmit}>
            <label className="labels">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={Inputs.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <br />
            <label className="labels">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={Inputs.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <br />
            <input type="submit" value="Login" className="submit_button" />
          </form>
          <p onClick={() => navigate("/register")} id="navi_login">
              Don't Have Account ? Please Register
            </p>
        </div>
        <div id="Banner_Side">
          <img src={lg_svg} alt="login banner" />
        </div>
      </div>
    </div>
  );
};

export default Login;
