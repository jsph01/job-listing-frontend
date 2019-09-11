import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JobsPage extends Component {
  render() {
    console.log(this.props.posts);
    return <>
      <h2>Jobs</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Job Title</th>
            <th scope="col">Zipcode</th>
            <th scope="col">Written by</th>
            <th scope="col">Date Posted</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(this.props.posts).map((key, idx) => {
            let post = this.props.posts[key];
            let postDate = new Date(post.createdAt);
            let dateDisplay = `${postDate.getMonth()}/${postDate.getDate()}/${postDate.getFullYear()}`
            return (
              <tr key={key}>
                <th scope="row">{idx+1}</th>
                <td><Link to={`/jobs/${key}`}>{post.title}</Link></td>
                <td><section to={`/jobs/${key}`}>{post.zipcode}</section></td>
                <td><section to={`/jobs/${key}`}>{post.authorUsername}</section></td>
                <td><section to={`/jobs/${key}`}>{dateDisplay}</section></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>;
  }
}

export default JobsPage;
