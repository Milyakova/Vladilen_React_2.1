import React from "react";
import NavBar from "../components/ui/navBar";
import Main from "../layouts/main";
import Login from "../layouts/login";
import Users from "../layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./notFound";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId?/:edit?" component={Users} />

        <Redirect from="/main" to="/" />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </>
  );
}
export default App;
