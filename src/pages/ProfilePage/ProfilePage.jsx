import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import tokenService from '../../utils/tokenService';

class ProfilePage extends Component{
  state = {
    editMode: false,
    editFields: null
  };

  handleChangeField = (e) => {
    let editFields = {...this.state.editFields};
    editFields[e.target.name] = e.target.value;
    if(e.target.name === "email") {
      document.getElementById('field-email').setCustomValidity('');
    }
    this.setState({ editFields });
  };

  handleEditOn = () => {
    this.setState({
      editMode: true,
      editFields: {
        firstName: '',
        lastName: '',
        email: '',
        zipcode: '',
        portraitUrl: ''
      }
    });
  };

  handleEditOff = () => {
    this.setState({ editMode: false, editFields: null });
  };

  handleSubmitEdit = (e) => {
    e.preventDefault();

    let userInfo = {...this.state.editFields};
    Object.keys(userInfo).forEach(fieldName => {
      if(userInfo[fieldName] === '') delete userInfo[fieldName];
    });

    fetch(`http://localhost:3001/api/users/${this.props.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify({ userInfo })
    })
      .then(res => res.json())
      .then(body => {
        let error = body.error;
        if(!!error) {
          if(error.name === "ValidationError") {
            let fieldname = Object.keys(error.errors)[0];
            let field = document.getElementById(`field-${fieldname}`);
            field.setCustomValidity(`this ${fieldname} has already been taken`);
            field.reportValidity();
          } else console.log(error);
        } else {
          tokenService.setToken(body.token);
          this.props.handleLogin();
          this.setState({ user: body.user })
          this.handleEditOff();
        }
      })
      .catch(console.log);
  };

  componentDidMount() {
    fetch(`http://localhost:3001/api/users/${this.props.user.id}`, {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
      .then(res => res.json())
      .then(body => this.setState({ user: body.user }))
      .catch(console.log);
  }

  render() {
    return !!this.state.user
    ? <>
        <h2>Hello {this.state.user.firstName + ' ' + this.state.user.lastName}</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '25% 75%'
        }}>
          <div className="card" style={{
            margin: '0 8px',
            textAlign: 'center',
          }}>
            <img className="card-img-top" src={this.state.user.portraitUrl} width="256px" alt="Profile" style={{ margin: 'auto' }} />
            <div className="card-body">
              <div>
                <label>username:&nbsp;</label>
                <strong>{this.state.user.username}</strong>
              </div>
              <div>
                <label>email:&nbsp;</label>
                <strong>{this.state.user.email}</strong>
              </div>
              <div>
                <label>zipcode:&nbsp;</label>
                <strong>{this.state.user.zipcode}</strong>
              </div>
              <div>
                <label>number of posts:&nbsp;</label>
                <strong>{this.state.user.posts.length}</strong>
              </div>
              {!this.state.editMode &&
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={this.handleEditOn}
                >edit info</button>}
            </div>
          </div>
          <div style={{ margin: '0 8px' }}>
            <h4>My Posts</h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Job Title</th>
                  <th scope="col">Zipcode</th>
                  <th scope="col">Date Posted</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(this.state.user.posts).map((key, idx) => {
                  let post = this.state.user.posts[key];
                  let postDate = new Date(post.createdAt);
                  let dateDisplay = `${postDate.getMonth()}/${postDate.getDate()}/${postDate.getFullYear()}`
                  return (
                    <tr key={key}>
                      <th scope="row">{idx+1}</th>
                      <td><Link to={`/jobs/${key}`}>{post.title}</Link></td>
                      <td><section to={`/jobs/${key}`}>{post.zipcode}</section></td>
                      <td><section to={`/jobs/${key}`}>{dateDisplay}</section></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.editMode
        && <>
            <form onSubmit={this.handleSubmitEdit}>
              <div>
                <label>email:{' '}</label>
                <input type="email" name="email" id="field-email" value={this.state.editFields.email} onChange={this.handleChangeField} />
              </div>
              <div>
                <label>zipcode:{' '}</label>
                <input type="text" name="zipcode" pattern="[0-9]{5}" value={this.state.editFields.zipcode} onChange={this.handleChangeField} />
              </div>
              <div>
                <label>first name:{' '}</label>
                <input type="text" name="firstName" value={this.state.editFields.firstName} onChange={this.handleChangeField} />
              </div>
              <div>
                <label>last name:{' '}</label>
                <input type="text" name="lastName" value={this.state.editFields.lastName} onChange={this.handleChangeField} />
              </div>
              <div>
                <label>profile image url:{' '}</label>
                <input type="url" name="portraitUrl" value={this.state.editFields.portraitUrl} onChange={this.handleChangeField} />
              </div>
              <div style={{ margin:'16px 40%'}}>
                <input className="btn btn-success" type="submit" value="submit" />
                <button className="btn btn-outline-danger" onClick={this.handleEditOff} type="button">
                  cancel
                </button>
              </div>
            </form>
          </>}
          <h5 style={{ marginTop: 12 }}>Replies</h5>
          {/* {this.state.user.replies.map((reply, idx) => (
                <ReplyComponent
                  key={`reply_${idx}`}
                  userUsername={this.state.user.username}
                  isAuthor={true}
                  reply={reply}
                  postId={reply.pos}
                  addReply={this.addReply}
                /> */}
      </>
    : <h2>Loading</h2>;
  }
}

export default ProfilePage;
