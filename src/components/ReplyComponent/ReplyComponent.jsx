import React, { Component } from 'react';
import tokenService from '../../utils/tokenService';

class ReplyComponent extends Component {
  state = {
    expanded: !this.props.isAuthor,
    reply: ''
  };

  toggleExpand = () => {
    if(this.props.isAuthor)
      this.setState({ expanded: !this.state.expanded });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/replies', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify({
        postId: this.props.postId,
        replyId: this.props.reply._id || null,
        reply: this.state.reply
      })
    })
    .then(res => res.json())
    .then(body => {
      this.props.addReply(body.reply);
      this.setState({ reply: ''});
    })
    .catch(console.log);
  };

  handleChange = (e) => this.setState({ reply: e.target.value});

  render() {
    return <div style = {{
      margin: '2px 0',
      border: '1px solid black',
      padding: '4px'
    }}>
      <div>
        {this.props.isAuthor &&
          <button onClick={this.toggleExpand}>{
            this.state.expanded ? '-' : '+'
          }</button>}
        {!this.state.expanded
        ? <label>{'  '}{this.props.reply.consumerUsername}</label>
        : this.props.isAuthor && 
            <>
              <label>{'  '}message history with:{' '}</label>
              <strong>{this.props.reply.consumerUsername}</strong>
            </>}
      </div>
      {this.state.expanded && 
        <div style={{ padding: '2%' }}>
          {this.props.reply.messages.map((message, idx) => (
            <div key={message._id}>
              {!!idx && <hr />}
              <strong>{message.authorUsername}:{' '}</strong>
              <span>{message.body}</span>
            </div>
          ))}
          <br />
          <form className="pure-form" onSubmit={this.handleSubmit}>
            <input required type="text" placeholder="reply" style={{ width: '85%'}} onChange={this.handleChange} value={this.state.reply} />
            <input type="submit" value="send" />
          </form>
        </div>}
    </div>;
  }
}

export default ReplyComponent;
