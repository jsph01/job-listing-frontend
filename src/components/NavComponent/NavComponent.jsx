import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NavComponent extends Component {
  render() {
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav" style={{
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/jobs">Jobs</Link>
        {this.props.user
        ? <>
            <Link className="nav-link" to="/profile">Profile</Link>
            <Link className="nav-link" to="/logout">Logout</Link>
          </>
        : <>
            <Link className="nav-link" to="/signup">Signup</Link>
            <Link className="nav-link" to="/login">Login</Link>
          </>}
      </ul>
    </div>
  </nav>
  }
}

export default NavComponent;
