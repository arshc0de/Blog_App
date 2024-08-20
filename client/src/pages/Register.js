import React, { useState } from "react";
import "../css/form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  //state
  const [Inputs, setInputs] = useState({
    name: "",
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: Inputs.name,
        email: Inputs.email,
        password: Inputs.password,
      });
      if (data.success) {
        //alert("user Register Sucessfully");
        toast.success("Registration successful!"); // Show toast notification

        // Delay navigation to ensure toast is visible
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Adjust time (in milliseconds) if needed
      }
    } catch (error) {
      console.log(error);
      toast.error("Registartion Failed!");
    }
  };

  return (
    <div id="register_page">
      <h1>Register</h1>
      <div id="conatiner">
        <form border="1px" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={Inputs.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
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
          <input
            type="password"
            name="password"
            value={Inputs.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <br />
          <input type="submit" value="Register" className="submit_button" />
        </form>
      </div>
      <p onClick={() => navigate("/login")} id="navi_login">
        Already Registerd ? Please Login
      </p>
    </div>
  );
};

export default Register;
