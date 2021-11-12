import React from "react";
import LoginScreen from "../components/auth/LoginScreen";
import { Switch, Route, Redirect } from "react-router-dom";

const AuthRouter = () => {
  return (
    <div className="">
      <div className="">
        <Switch>
          <Route path="/auth/login" component={LoginScreen} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};

export default AuthRouter;
