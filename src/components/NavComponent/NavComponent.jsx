import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NavComponent extends Component {
  render() {
    return <nav style={{
      display: 'flex',
      justifyContent: 'space-around',
      border: '1px solid black',
      padding: '3px 0'
    }}>
      <Link to="/">Home</Link>
      <Link to="/jobs">Jobs</Link>
      {this.props.user
      ? <>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </>
      : <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>}
    </nav>
  }
}

export default NavComponent;
