import React, { Component } from 'react';
import tokenService from '../../utils/tokenService';

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
    .catch(err => console.log(err));
  };

  componentDidMount() {
    fetch(`http://localhost:3001/api/users/${this.props.user.id}`, {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    .then(res => res.json())
    .then(body => this.setState({ user: body.user }))
    .catch(err => console.log(err));
  }

  render() {
    return !!this.state.user
    ? <>
        <h2>Hello {this.state.user.firstName + ' ' + this.state.user.lastName}</h2>
        <img src={this.state.user.portraitUrl} width="256px" alt="Profile" />
        <div>
          <div>
            <label>username:{' '}</label>
            <span>{this.state.user.username}</span>
          </div>
          <div>
            <label>email:{' '}</label>
            <span>{this.state.user.email}</span>
          </div>
          <div>
            <label>zipcode:{' '}</label>
            <span>{this.state.user.zipcode}</span>
          </div>
        </div>

        {this.state.editMode
        ? <>
            <button onClick={this.handleEditOff}>cancel edit</button>
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
              <input type="submit" value="submit" />
            </form>
          </>
        : <button onClick={this.handleEditOn}>edit info</button>}
      </>
    : <h2>Loading</h2>;
  }
}

export default ProfilePage;
