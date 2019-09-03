import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NavComponent extends Component {
  render() {
    return <nav style={{
      display: 'flex',
      justifyContent: 'space-around',
      border: '1px solid black'
    }}>
      <Link to="/">Home</Link>
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
