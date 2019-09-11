import React from 'react';

function LandingPage() {
  return <>
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
      <button style={{ margin: '2px' }} className="btn btn-lg btn-outline-success">view jobs</button>
      <button style={{ margin: '2px' }} className="btn btn-lg btn-outline-success">Sign Up</button>
    </div>
  </>;
}

export default LandingPage;