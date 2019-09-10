import React, { Component } from 'react';

import tokenService from '../../utils/tokenService';

class NewJobPage extends Component {
  state = {
    postInfo: {
      title: '',
      kind: 'offering',
      body: '',
      zipcode: ''
    }
  }

  handleChangeField = (e) => {
    let postInfo = {...this.state.postInfo};
    postInfo[e.target.name] = e.target.value;
    this.setState({ postInfo });
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/posts', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify({ post: this.state.postInfo })
    })
    .then(res => res.json())
    .then(body => {
      let id = body.post._id;
      this.props.addPost(body.post);
      this.props.history.push(`/jobs/${id}`);
    });
  };

  render() {
    return <>
      <h2>Create a job-listing</h2>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Title:{' '}</label>
          <input required type="text" name="title" onChange={this.handleChangeField} value={this.state.postInfo.title} style={{ width: '100%' }} />
        </div>
        <div>
          <p>Are you offering work or seeking it?:{' '}
          <select type="text" name="kind" onChange={this.handleChangeField} value={this.state.postInfo.kind}>
            <option>offering</option>
            <option>seeking</option>
          </select></p>
        </div>
        <div>
          <section>Message Body:{' '}</section>
          <textarea required type="text" name="body" onChange={this.handleChangeField} value={this.state.postInfo.body} style={{ width: '100%' }} rows="15" />
        </div>
        <div>
          <p>zipcode:{' '}
            <input required pattern="[0-9]{5}" type="text" name="zipcode" onChange={this.handleChangeField} value={this.state.postInfo.zipcode} size="5" maxLength="5" />
          </p>
        </div>
        <input type="submit" value="post ad" />
      </form>
    </>;
  }
}

export default NewJobPage;
