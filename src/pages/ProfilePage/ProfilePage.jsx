import React, { Component } from 'react';
import tokenService from '../../utils/tokenService';
import { Base64 } from 'js-base64';

//import { Link } from 'react-router-dom';

class ProfilePage extends Component{
  state = {
    editMode: false,
    editFields: null
  };

  handleChangeField = (e) => {
    let editFields = this.state.editFields;
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

    let user = {...this.state.editFields};
    Object.keys(user).forEach(fieldName => {
      if(user[fieldName] === '') delete user[fieldName];
    });

    if(user.portraitUrl) user.portraitUrl = Base64.encodeURI(user.portraitUrl);

    fetch(`http://localhost:3001/api/users/${this.props.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify({ user })
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
        this.handleEditOff();
      }
    })
    .catch(err => console.log(err));
  };

  render() {
    return <>
      <h2>Hello {this.props.user.firstName + ' ' + this.props.user.lastName}</h2>
      <img src={Base64.decode(this.props.user.portraitUrl)} width="256px" alt="Profile" />
      <div>
        <div>
          <label>username:&nbsp;</label>
          <span>{this.props.user.username}</span>
        </div>
        <div>
          <label>email:&nbsp;</label>
          <span>{this.props.user.email}</span>
        </div>
        <div>
          <label>zipcode:&nbsp;</label>
          <span>{this.props.user.zipcode}</span>
        </div>
      </div>

      {this.state.editMode
      ? <>
          <button onClick={this.handleEditOff}>cancel edit</button>
          <form onSubmit={this.handleSubmitEdit}>
            <div>
              <label>email:&nbsp;</label>
              <input type="email" name="email" id="field-email" value={this.state.editFields.email} onChange={this.handleChangeField} />
            </div>
            <div>
              <label>zipcode:&nbsp;</label>
              <input type="text" name="zipcode" pattern="[0-9]{5}" value={this.state.editFields.zipcode} onChange={this.handleChangeField} />
            </div>
            <div>
              <label>first name:&nbsp;</label>
              <input type="text" name="firstName" value={this.state.editFields.firstName} onChange={this.handleChangeField} />
            </div>
            <div>
              <label>last name:&nbsp;</label>
              <input type="text" name="lastName" value={this.state.editFields.lastName} onChange={this.handleChangeField} />
            </div>
            <div>
              <label>profile image url:&nbsp;</label>
              <input type="url" name="portraitUrl" value={this.state.editFields.portraitUrl} onChange={this.handleChangeField} />
            </div>
            <input type="submit" value="submit" />
          </form>
        </>
      : <button onClick={this.handleEditOn}>edit info</button>}
    </>;
  }
}

export default ProfilePage;
