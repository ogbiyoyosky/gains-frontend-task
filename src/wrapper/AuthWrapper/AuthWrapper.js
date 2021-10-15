import { Redirect, Route, Switch } from "react-router";
import Header from "../../includes/Header/Header";
import Dashboard from "../../views/Dashboard/Dashboard";
import VerifyEmail from "../../views/VerifyEmail/VerifyEmail";

function AuthWrapper(){
    return (
        localStorage.getItem("Gain-Token") ? <div className="AuthWrapper">
            <Header />
            <Switch>
              
              <Route path="/auth/dashboard" component={Dashboard} />
              <Route path="/auth/verify-email/:token" component={VerifyEmail} />
            </Switch>
        </div> : 
        <Redirect to="/signin" />
        
    )
}

export default AuthWrapper;