import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import { useSelector } from "react-redux";
import HomeScreen from "../components/home/HomeScreen";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Header from "../components/common/Header";

const AppRouter = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [logged, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isAuthenticated, setIsLoggedIn]);

  return (
    <Router>
      <Header />
      <main className="d-flex justify-content-center align-items-center h-100">
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={HomeScreen}
            isAuthenticated={logged}
          />
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isAuthenticated={logged}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </main>
    </Router>
  );
};

export default AppRouter;
