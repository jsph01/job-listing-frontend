import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import NavComponent from '../components/NavComponent/NavComponent.jsx';
import LoginPage from '../pages/LoginPage/LoginPage.jsx';
import SignupPage from '../pages/SignupPage/SignupPage.jsx';
import LogoutPage from '../pages/LogoutPage/LogoutPage.jsx';
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx';

import userService from '../utils/authService';
//import { Base64 } from 'js-base64';

function PrivateRoute({component: Component, user, cProps, ...rest}) {
  return <Route {...rest} render={props => {
    if(user) return <Component {...cProps} user={user} />;
    else return <Redirect to="/login" />;
  }} />;
}

class App extends Component {
  state = { user : userService.getUser() || null }; 

  handleLogin = () => {
    let user = userService.getUser() || null;
    //if(!!user) user.portraitUrl = Base64.decode(user.portraitUrl);
    this.setState({ user });
  };

  handleLogout = () => {
    userService.logout()
    this.setState({ user: null });
  };

  render() {
    return <>
      <Router>
        <NavComponent user={this.state.user} />
        <Switch>
          <Route exact path="/login" render={props => (
            <LoginPage {...props} handleLogin={this.handleLogin} />
          )} />
          <Route exact path="/signup" render={props => (
            <SignupPage {...props} handleLogin={this.handleLogin} />
          )} />
          <Route exact path="/logout" render={props => (
            <LogoutPage handleLogout={this.handleLogout} />
          )} />
          <PrivateRoute exact path="/profile" user={this.state.user} component={ProfilePage} cProps={{
            handleLogin: this.handleLogin
          }} />
        </Switch>
      </Router>
    </>;
  }
}

export default App;
