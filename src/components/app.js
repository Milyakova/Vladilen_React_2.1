import React from "react";
import NavBar from "../components/ui/navBar";
import Main from "../layouts/main";
import Login from "../layouts/login";
import Users from "../layouts/users";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./notFound";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "../hooks/useProfession";
import { QualityProvider } from "../hooks/useQualities";

function App() {
  return (
    <>
      <NavBar />

      <Switch>
        <ProfessionProvider>
          <QualityProvider>
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
          </QualityProvider>
        </ProfessionProvider>
        <Route path="/" exact component={Main} />
        <Redirect from="/main" to="/" />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
      <ToastContainer />
    </>
  );
}
export default App;
