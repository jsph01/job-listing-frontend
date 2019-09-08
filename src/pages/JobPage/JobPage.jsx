import React, { Component } from 'react';
import tokenService from '../../utils/tokenService';
import ReplyComponent from '../../components/ReplyComponent/ReplyComponent';

class JobPage extends Component {
  state = {};

  addReply = (reply) => {
    let post = this.state.post;
    let replies = post.replies;
    let message = reply.messages[reply.messages.length - 1];
    let replyIdx = post.replies.findIndex(r => r._id === reply._id);
    if(replyIdx === -1) {
      replies[0]._id = reply._id;
      replies[0].messages.push(message);
    }
    else {
      replies[replyIdx].messages.push(message);
    }
    //post.replies = replies;
    //this.setState();
  };
  
  componentDidMount() {
    let token = tokenService.getToken();
    let options = !!token
    ? { headers: { 'Authorization': `Bearer ${token}` }}
    : {};
    fetch(`http://localhost:3001/api/posts/${this.props.postId}`, options)
    .then(res => res.json())
    .then(body => {
      if(this.props.user && !this.state.isAuthor && body.post.replies.length === 0) {
        body.post.replies.push({
          consumerUsername: this.props.user.username,
          messages: []
        });
      }
      this.setState({
        post: body.post,
        isAuthor: !!this.props.user && this.props.user.username === body.post.authorUsername
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    let post = this.state.post
    return post
    ? <>
        <h2>{post.title}</h2>
        <label>Posted by:{' '}</label>
        <strong>{post.authorUsername}</strong>
        <p>{post.body}</p>
        <p>zipcode:{' '}<strong>{post.zipcode}</strong></p>
        
        {(() => {
          if(!!post.replies.length)
            return <>
              <h3>replies</h3>
              {post.replies.map((reply, idx) => (
                <ReplyComponent
                  key={`reply_${idx}`}
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
