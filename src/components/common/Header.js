import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth";
import { PageHeader, Button } from "antd";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let history = useHistory();

  const authButtons = (
    <Button key="logout" onClick={() => dispatch(logout())}>
      Logout
    </Button>
  );
  const guestButtons = (
    <Button key="login" onClick={() => history.push("/auth/login")}>
      Login
    </Button>
  );

  const statusButtons = isAuthenticated ? authButtons : guestButtons;

  return (
    <PageHeader
      className="site-page-header"
      title="To Do"
      extra={[statusButtons]}
    />
  );

  //   return (
  //     <div>
  //       <h1>Headehr</h1>
  //       <h2>auth: {isAuthenticated}</h2>
  //       {isAuthenticated === true && (
  //         <button type="button" onClick={() => dispatch(logout())}>
  //           Logout
  //         </button>
  //       )}
  //     </div>
  //   );
};

export default Header;
