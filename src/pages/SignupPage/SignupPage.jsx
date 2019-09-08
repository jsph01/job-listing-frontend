import React, { Component } from 'react';

import userService from '../../utils/authService';
import { Base64 } from 'js-base64';

class SignupPage extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		password2: '',
		zipcode: '',
		firstName: '',
		lastName: '',
		portraitUrl: ''
	};

	validatePassword = () => {
		let fieldPassword2 = document.getElementById('field-password2');
		if(this.state.password !== this.state.password2) 
			fieldPassword2.setCustomValidity("passwords don't match");
		else
			fieldPassword2.setCustomValidity('');
	}
	
	handleChangeField = (e) => {
		let name = e.target.name;
		this.setState(
			{ [name]: e.target.value },
			() => {
				switch(name) {
					case 'password':
						this.validatePassword();
						break;
					case 'username':
						document.getElementById('field-username').setCustomValidity('');
						break;
					case 'email':
							document.getElementById('field-email').setCustomValidity('');
							break;
					default: break;
				}
			}
		);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ portraitUrl: Base64.encodeURI(this.state.portraitUrl)}, () => {
			userService.signup(this.state, (error) => {
				if(!!error) {
					if(error.name === "ValidationError") {
						let fieldname = Object.keys(error.errors)[0];
						let field = document.getElementById(`field-${fieldname}`);
						field.setCustomValidity(`this ${fieldname} has already been taken`);
						field.reportValidity();
					} else console.log(error);
				} else {
					this.props.handleLogin();
					this.props.history.push('/profile')
				} 
			});
		});
	};
	
	render() {
		return <>
			<h2>Signup Page</h2>
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>username:{' '}</label>
					<input type="text" name="username" id="field-username" required value={this.state.username} onChange={this.handleChangeField} />
				</div>
				<div>
					<label>email:{' '}</label>
					<input type="email" name="email" id="field-email" required value={this.state.email} onChange={this.handleChangeField} />
				</div>
				<div>
					<label>password:{' '}</label>
					<input type="password" name="password" required value={this.state.password} onChange={this.handleChangeField} />
				</div>
				<div>
					<label>confirm password:{' '}</label>
					<input type="password" name="password2" id="field-password2" required value={this.state.password2} onChange={this.handleChangeField} onKeyUp={this.validatePassword} />
				</div>
				<div>
					<label>zipcode:{' '}</label>
					<input type="text" name="zipcode" pattern="[0-9]{5}" required value={this.state.zipcode} onChange={this.handleChangeField} />
				</div>
				<div>
					<label>first name:{' '}</label>
					<input type="text" name="firstName" required value={this.state.firstName} onChange={this.handleChangeField} />
				</div>
				<div>
					<label>last name:{' '}</label>
					<input type="text" name="lastName" required value={this.state.lastName} onChange={this.handleChangeField} />
				</div>
				<div>
					<label>profile image url:{' '}</label>
					<input type="url" name="portraitUrl" value={this.state.portraitUrl} onChange={this.handleChangeField} />
				</div>
				<input type="submit" value="submit" />
			</form>
		</>;
	}
}

export default SignupPage;
