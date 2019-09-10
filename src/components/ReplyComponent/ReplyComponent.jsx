import React, { Component } from 'react';
import tokenService from '../../utils/tokenService';

class ReplyComponent extends Component {
  state = {
    expanded: !this.props.isAuthor,
    reply: this.props.reply,
    newMessage: ''
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
        replyId: this.state.reply._id || null,
        reply: this.state.newMessage
      })
    })
    .then(res => res.json())
    .then(body => {
      this.props.addReply({
        _id: body.reply._id,
        message: body.reply.messages[body.reply.messages.length - 1]
      });
      this.setState({ newMessage: ''});
    })
    .catch(console.log);
  };

  handleChange = (e) => this.setState({ newMessage: e.target.value});

  handleDelete = (e) => {
    e.preventDefault();
    let messageIdx = e.target.getAttribute('data-idx');
    fetch(`http://localhost:3001/api/replies/${this.props.reply._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify({
        messageIdx,
        postId: this.props.postId
      })
    })
      .then(res => res.json())
      .then(body => {
        this.setState(state => {
          let reply = state.reply;
          reply.messages.splice(messageIdx, 1);
          return ({ reply });
        });
      })
      .catch(console.log);
  };

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
              <span style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>
                  <strong>{message.authorUsername}:{' '}</strong>
                  <span>{message.body}</span>
                </span>
                {this.props.userUsername === message.authorUsername &&
                  <form data-idx={idx} onSubmit={this.handleDelete} style={{ display: 'inline' }}>
                    <input type="submit" value="x" />
                  </form>}
              </span>
            </div>
          ))}
          <br />
          <form className="pure-form" onSubmit={this.handleSubmit} style={{
            display: 'grid',
            gridTemplateColumns: '90% 10%'
          }}>
            <input required type="text" placeholder="reply" style={{ width: '100%'}} onChange={this.handleChange} value={this.state.newMessage} />
            <input type="submit" value="send" />
          </form>
        </div>}
    </div>;
  }
}

export default ReplyComponent;
