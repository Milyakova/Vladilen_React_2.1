import React from "react";
import NavBar from "./navBar";
import Main from "./main";
import Login from "./login";
import Users from "./users";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./notFound";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
        <Redirect from="/main" to="/" />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </>
  );
}
export default App;
