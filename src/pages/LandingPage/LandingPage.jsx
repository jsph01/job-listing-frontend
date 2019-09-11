import React from 'react';
import { Link } from 'react-router-dom'

function LandingPage() {
  return <>
    <h3 style={{ marginTop: 32, textAlign: 'center'}}>WorkSpree</h3>
    <div style={{
      display: 'grid',
      gridTemplateColumns: '50% 50%'
    }}>
      <img src="http://paradisevalleyseptic.com/wp-content/uploads/2017/09/Are-You-Using-the-Right-Plunger.jpg"
        alt="plunger"
        style={{ width: '100%' }}
      />
      <h1 style={{ margin: 'auto' }}>If you need someone for the job fast, you've come to the right place.</h1>
    </div>
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Link
        className="btn btn-lg btn-outline-success"
        to="/jobs"
        style={{ margin: '2px' }}
      > view jobs </Link>
      <Link
        className="btn btn-lg btn-outline-success"
        to="/signup"
        style={{ margin: '2px' }}
      > Sign Up </Link>
    </div>
  </>;
}

export default LandingPage;