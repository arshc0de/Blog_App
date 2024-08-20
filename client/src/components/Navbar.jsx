import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {authActions} from '../redux/store';
import "../css/Navbar.css";
import { toast } from 'react-toastify';

function Navbar() {
  //global state
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(isLogin);
  //local state

  //logout 
  const handelLogout = () =>{
    try {
      dispatch(authActions.logout());
      toast.success("Logout successful!");
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }
  return (
    <div id="Navbar">
      <p className="logo">Blog World</p>
      {isLogin && (
        <div id="nav_blogs">
          <p>
            <NavLink className="nav_a" to="/">
              Blogs
            </NavLink>
          </p>
          <p>
            <NavLink className="nav_a" to="/">
              My Blogs
            </NavLink>
          </p>
        </div>
      )}
      <div id="user">
        {!isLogin && (
          <>
            <p>
              <NavLink className="nav_a" to="/login">
                Login
              </NavLink>
            </p>
            <p>
              <NavLink className="nav_a" to="/register">
                Register
              </NavLink>
            </p>
          </>
        )}
        {isLogin && (
          <>
            <p className="nav_a" to="/logout" onClick={handelLogout}>
              Logout
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
