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
      <div className="align-element">
        <div className="navbar-start   ">MyApp</div>
        <div className="navbar-menu ">
          {user ? (
            <div className="navbar-center gap-10 flex ">
              <img
                src={user.photoURL}
                alt="Profile"
                className="profile-pic"
                width={80}
                height={80}
              />
              <span className="text-center mt-7">{user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="navbar-end">
              <span>Login</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
