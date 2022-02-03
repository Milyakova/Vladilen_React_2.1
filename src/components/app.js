import React from "react";
import NavBar from "../components/ui/navBar";
import Main from "../layouts/main";
import Login from "../layouts/login";
import Users from "../layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./notFound";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./common/protectedRoutes";
import LogOut from "../layouts/logout";
import AppLoader from "./ui/hoc/appLoader";

function App() {
  return (
    <>
      <AppLoader>
        <NavBar />

        <Switch>
          <Route path="/login/:type?" component={Login} />
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/" exact component={Main} />
          <Route path="/logout" component={LogOut} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  );
}
export default App;
