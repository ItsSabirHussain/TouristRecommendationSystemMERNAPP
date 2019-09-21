import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import { NoMatch } from "./NoMatch";
import UserLogin from "./components/userlogin";
import AdminLogin from "./components/adminlogin";
import UserReg from "./components/userreg";
import Userdashboard from "./components/users/userdashboard";
import AdminDashboard from "./components/admin/admindashboard";
import Map from "./components/users/showmap";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/userlogin" component={UserLogin} />
            <Route exact path="/adminlogin" component={AdminLogin} />
            <Route exact path="/userreg" component={UserReg} />
            <Route path="/userdashboard" component={Userdashboard} />
            <Route path="/admindashboard" component={AdminDashboard} />
            <Route path="/map" component={Map} />

            <Route component={NoMatch} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
