import React, { Component } from 'react';
import tokenService from '../../utils/tokenService';
import ReplyComponent from '../../components/ReplyComponent/ReplyComponent';

class JobPage extends Component {
  state = {
    editMode: false,
    body: ''
  };

  addReply = (newReply) => {
    let replyIdx = this.state.post.replies.findIndex(r => r._id === newReply._id);
    if(replyIdx === -1) replyIdx = 0;

    this.setState(state => {
      let post = state.post;
      post.replies[replyIdx]._id = newReply._id;
      post.replies[replyIdx].messages.push(newReply.message);
      return ({ post });
    });
  };

  handleEditOn = () => this.setState(state => ({
    editMode: true,
    body: state.post.body
  }));

  handleEditOff = () => this.setState({
    editMode: false,
    body: ''
  });

  handleChange = (e) => this.setState({ body: e.target.value });

  submitDelete = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/posts/${this.props.postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
      .then(res => res.json())
      .then(() => {
        this.props.removePost(this.props.postId);
        this.props.history.push('/profile');
      })
      .catch(console.log);
  };

  submitEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/posts/${this.props.postId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify({ postInfo: {
        body: this.state.body
      }})
    })
      .then(res => res.json())
      .then(body => {
        let post = {...this.state.post};
        post.body = body.post.body;
        this.setState( {
          post,
          editMode: false,
          body: ''
        });
      })
      .catch(console.log);
  };
  
  componentDidMount() {
    let token = tokenService.getToken();
    let options = !!token
    ? { headers: { 'Authorization': `Bearer ${token}` }}
    : {};
    fetch(`http://localhost:3001/api/posts/${this.props.postId}`, options)
      .then(res => res.json())
      .then(body => {
        let isAuthor = !!this.props.user && this.props.user.username === body.post.authorUsername;
        if(this.props.user && !isAuthor && body.post.replies.length === 0) {
          body.post.replies.push({
            consumerUsername: this.props.user.username,
            messages: []
          });
        }
        this.setState({
          post: body.post,
          isAuthor
        })
      })
      .catch(console.log);
  }

  render() {
    let post = this.state.post
    return post
    ? <>
        <span style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <h2>{post.title}</h2>
          {this.state.isAuthor &&
            <span style={{ margin: 'auto 0' }}>
              <button onClick={this.handleEditOn}>edit</button>
              <form onSubmit={this.submitDelete} style={{ display: 'inline' }}>
                <input type="submit" value="delete" />
              </form>
            </span>}
        </span>
        <label>Posted by:{' '}</label>
        <strong>{post.authorUsername}</strong>
        {this.state.editMode
        ? <div style={{ margin: '1em 0' }}>
            <form onSubmit={this.submitEdit}>
              <textarea onChange={this.handleChange} value={this.state.body} style={{ width: '100%' }} rows="15" />
              <button type="button" onClick={this.handleEditOff}>cancel</button>
              <input type="submit" value="save changes" />
            </form>
          </div>
        : <p>{post.body}</p>}
        <p>zipcode:{' '}<strong>{post.zipcode}</strong></p>
        
        {(() => {
          if(!!post.replies.length)
            return <>
              <h3>replies</h3>
              {post.replies.map((reply, idx) => (
                <ReplyComponent
                  key={`reply_${idx}`}
                  userUsername={this.props.user.username}
                  isAuthor={this.state.isAuthor}
                  reply={reply}
                  postId={post._id}
                  addReply={this.addReply}
                />
              ))}
            </>;
          else if(!this.props.user)
            return <button onClick={() => {
              this.props.history.push('/signup');
            }}>
              Sign Up to reply to this post!
            </button>;
          else if(this.state.isAuthor)
            return <i>you have no repies to this post yet.</i>;
        })()}

      </>
    : <h2>Loading...</h2>
  }
}

export default JobPage;
