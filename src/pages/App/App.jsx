import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import NavComponent from '../../components/NavComponent/NavComponent.jsx';
import LoginPage from '../LoginPage/LoginPage.jsx';
import SignupPage from '../SignupPage/SignupPage.jsx';
import LogoutPage from '../LogoutPage/LogoutPage.jsx';
import ProfilePage from '../ProfilePage/ProfilePage.jsx';
import NewJobPage from '../NewJobPage/NewJobPage.jsx';
import JobsListPage from '../JobsListPage/JobsListPage.jsx';
import JobPage from '../JobPage/JobPage.jsx';

import userService from '../../utils/authService';

import './App.css';

function PrivateRoute({ cb, ...rest }) {
  return <Route {...rest} render={props => {
    let component = cb(props);
    if(!!component.props.user) return component;
    else return <Redirect to="/login" />;
  }} />;
}

class App extends Component {
  state = {
    user : userService.getUser() || null,
    posts: {}
  }; 

  addPost = (post) => {
    console.log('adding post')
    let id = post._id;
    delete post._id;
    let posts = this.state.posts;
    posts[id] = post;
    this.setState({ posts });
  };

  handleLogin = () => {
    let user = userService.getUser() || null;
    this.setState({ user });
  };

  handleLogout = () => {
    userService.logout()
    this.setState({ user: null });
  };

  componentDidMount() {
    fetch('http://localhost:3001/api/posts')
    .then(res => res.json())
    .then(body => {
      let posts = {};
      body.posts.forEach(post => {
        let id = post._id;
        delete post._id;
        posts[id] = post;
      });
      this.setState({ posts })
    })
    .catch(err => console.log(err));
  }

  render() {
    return <div className="App">
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
          <Route exact path="/jobs" render={props => (
            <JobsListPage history={props.history} posts={this.state.posts} />
          )} />

          <PrivateRoute exact path="/jobs/new" cb={props => (
            <NewJobPage history={props.history} user={this.state.user} addPost={this.addPost} />
          )} />

          {/* <PrivateRoute exact path="/jobs/new"
            user={this.state.user}
            component={NewJobPage}
            cProps={{ addPost: this.addPost }}
          /> */}

          <Route exact path="/jobs/:id" render={props => (
            <JobPage history={props.history} user={this.state.user} postId={props.match.params.id} />
          )} />

          <PrivateRoute exact path="/profile" user={this.state.user} cb={props => (
            <ProfilePage user={this.state.user} handleLogin={this.handleLogin} />
          )}/>

          {/* <PrivateRoute exact path="/profile"
            user={this.state.user}
            component={ProfilePage}
            cProps={{ handleLogin: this.handleLogin }}
          /> */}          
        </Switch>
      </Router>
    </div>;
  }
}

export default App;
