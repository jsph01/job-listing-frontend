import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JobsPage extends Component {
  render() {
    return <>
      <h2>Jobs</h2>
      <button onClick={() => this.props.history.push('/jobs/new')}>
        create a new post
      </button>
      <ol>
        {Object.keys(this.props.posts).map(key => {
          let post = this.props.posts[key];
          return <li key={key}>
            <Link to={`/jobs/${key}`}>{post.title}</Link>            
          </li>
        })}
      </ol>
    </>;
  }
}

export default JobsPage;
