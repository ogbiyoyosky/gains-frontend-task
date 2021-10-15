// import logo from './logo.svg';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import "./App.css";
import NotFound from "./views/NotFound/NotFound";
import SignUp from "./views/SignUp/SignUp";
import AuthWrapper from "./wrapper/AuthWrapper/AuthWrapper";
import SignIn from "./views/SignIn/SignIn";
import Token from "./views/Token/Token";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/signin/:token" component={Token} />
          <Route path="/auth" component={AuthWrapper} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/">
            {localStorage.getItem("Gain-Token") ? (
              <Redirect to="/auth/dashboard"></Redirect>
            ) : (
              <Redirect to="/signin"></Redirect>
            )}
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
