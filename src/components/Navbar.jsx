import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar  bg-base-200 ">
      <div className="navbar-brand align-element">MyApp</div>
      <div className="navbar-menu">
        {user ? (
          <div className="navbar-item gap-10 flex">
            <img
              src={user.photoURL}
              alt="Profile"
              className="profile-pic"
              // width={50}
              // height={50}
            />
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navbar-item">
            <span>Login</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
