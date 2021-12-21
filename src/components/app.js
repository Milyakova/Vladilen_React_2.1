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
import AuthProvider from "../hooks/useAuth";
import LoginProvider from "../hooks/useLogin";

function App() {
  return (
    <>
      <AuthProvider>
        <LoginProvider>
          <NavBar />
          <ProfessionProvider>
            <QualityProvider>
              <Switch>
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
              </Switch>
            </QualityProvider>
          </ProfessionProvider>
        </LoginProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}
export default App;
