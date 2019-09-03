import tokenService from './tokenService';

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(userInfo, cb) {
  return fetch('http://localhost:3001/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userInfo })
	})
	.then(res => res.json())
	.then(body => {
		if(body.token) tokenService.setToken(body.token)
		else var error = true;
		cb(error);
	})
	.catch(err => console.log(err));
}

function signup(userInfo, cb) {
	fetch('http://localhost:3001/api/auth/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userInfo })
	})
	.then(res => res.json())
	.then(body => {
		if(body.token) tokenService.setToken(body.token);
		cb(body.error);
	})
	.catch(err => console.log(err));	
}

export default {
  signup, 
  getUser,
  logout,
  login
};
