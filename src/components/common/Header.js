import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth";
import { ListContext } from "../../store/context";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { setCurrSelect } = useContext(ListContext);
  const dispatch = useDispatch();
  let history = useHistory();

  const authButtons = (
    <button
      className="btn btn-outline-danger"
      key="logout"
      onClick={() => {
        dispatch(logout());
        setCurrSelect({});
      }}
    >
      Logout
    </button>
  );
  const guestButtons = (
    <button
      className="btn btn btn-outline-primary"
      key="login"
      onClick={() => history.push("/auth/login")}
    >
      Login
    </button>
  );

  const statusButtons = isAuthenticated ? authButtons : guestButtons;

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">To Do</div>
        {statusButtons}
      </div>
    </nav>
  );
};

export default Header;
