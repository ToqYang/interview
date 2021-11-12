import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Headehr</h1>
      <h2>auth: {isAuthenticated}</h2>
      {isAuthenticated === true && (
        <button type="button" onClick={() => dispatch(logout())}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
