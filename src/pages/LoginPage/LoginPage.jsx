import React, { Component } from 'react';
import userService from '../../utils/authService';

class LoginPage extends Component {
	state = {
		username: '',
		password: ''
	};

	handleChangeField = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		document.getElementById('field-username').setCustomValidity('');
	};

	handleSubmit = (e) => {
		e.preventDefault();
		userService.login(this.state, (error) => {
			if(error) {
				let fieldUsername = document.getElementById('field-username');
				fieldUsername.setCustomValidity('the username or password is incorrect');
				fieldUsername.reportValidity();
			} else {
				this.props.handleLogin();
				this.props.history.push('/profile')
			}
		});
	};
	
	render() {
		return <>
			<h2 style={{ textAlign: 'center', margin: '32px 0' }}>Login</h2>
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>username:{' '}</label>
					<input type="text" name="username" id="field-username" required value={this.state.username} onChange={this.handleChangeField} />
				</div>
				<div>
					<label>password:{' '}</label>
					<input type="password" name="password" required value={this.state.password} onChange={this.handleChangeField} />
				</div>
				<div style={{ justifyContent: 'center', margin:'16px 0'}}>
					<input className="btn btn-success" type="submit" value="submit" />
				</div>
			</form>
		</>;
	}
}

export default LoginPage;
