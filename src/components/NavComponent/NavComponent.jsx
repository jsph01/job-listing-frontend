import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NavComponent extends Component {
  render() {
    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top" style ={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%'
    }}>
      <Link className="navbar-brand" to="/">WorkSpree</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <Link className="nav-link" to="/jobs">Jobs</Link>
          {this.props.user
          ? <>
              <Link className="nav-link" to="/jobs/new">Advertise</Link>
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
