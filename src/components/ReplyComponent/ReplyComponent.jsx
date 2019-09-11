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
      border: '1px solid darkgray',
      borderRadius: 4,
      padding: '4px'
    }}>
      <div>
        {this.props.isAuthor &&
          (this.state.expanded
          ? <button style={{
              padding: 0,
              width: '1em',
              height: '1em',
              lineHeight: 0,
              display: 'inline'
            }} className="btn btn-sm btn-outline-secondary" onClick={this.toggleExpand}>
              <i className="fa fa-minus-square-o" aria-hidden="true" />
            </button>
          : <button style={{
              padding: 0,
              width: '1em',
              height: '1em',
              lineHeight: 0,
              display: 'inline'
            }} className="btn btn-sm btn-outline-success" onClick={this.toggleExpand}>
              <i className="fa fa-plus-square-o" aria-hidden="true" />
            </button>)}

        {!this.state.expanded
        ? <label>&nbsp;{this.props.reply.consumerUsername}</label>
        : this.props.isAuthor && 
            <>
              <label>&nbsp;message history with:&nbsp;</label>
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
                  <strong>{message.authorUsername}:&nbsp;</strong>
                  <span>{message.body}</span>
                </span>
                {this.props.userUsername === message.authorUsername &&
                  <form data-idx={idx} onSubmit={this.handleDelete} style={{ display: 'inline' }}>
                    <button className="btn btn-sm btn-danger">
                      <i className="fa fa-times" aria-hidden="true"/>                  
                    </button>
                  </form>}
              </span>
            </div>
          ))}
          <br />
          <form className="pure-form" onSubmit={this.handleSubmit} style={{
            display: 'grid',
            gridTemplateColumns: '90% 10%'
          }}>
            <input required type="text" placeholder="reply" style={{ width: '100%' }} onChange={this.handleChange} value={this.state.newMessage} />
            <input className="btn btn-success" type="submit" value="send" />
          </form>
        </div>}
    </div>;
  }
}

export default ReplyComponent;
