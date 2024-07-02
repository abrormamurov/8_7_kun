import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/userSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar bg-base-300 maw-w-5xl mx-auto px-8 flex ">
      <div className="align-element">
        <li className="navbar-start  flex items-center	  ">
          <div className="btn hidden lg:flex ">
            <Link className="" to="/">
              MyApp
            </Link>
          </div>
          <div className="navbar-menu ml-96">
            {user ? (
              <div className="navbar-center gap-10 flex ">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="profile-pic"
                  width={80}
                  height={80}
                />
                <span className="text-center mt-7 ">{user.email}</span>
                <button
                  className="btn btn-secondary mt-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-end">
                <span>Login</span>
              </div>
            )}
          </div>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
