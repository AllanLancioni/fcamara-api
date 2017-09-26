const app = require('../config');

const
		UserController = require('./UserController'),
		User = UserController.model;

class AuthController {

	constructor(user) {

		this.request = user;
		this.err = null;
		this.user = null;
		this.token = null;
	}

	find(callback) {

		User.findOne(this.request, (err, user) => {

			console.log('USER', user);
			this.err = err;
			this.user = user;

			if (!err && user ) {
				this.token = app.jwt.sign({data:user}, app.secret, {
					expiresIn: 60 //seconds
				});
			}
			callback({err, user, token:this.token});

    });

	}
}

module.exports = AuthController;