const app = require('../config');

const authGuard = app.express.Router();

authGuard.use( (req, res, next) => {
	const token = req.headers['auth-token'];
	console.log(req.headers);


	if (token) {
		app.jwt.verify(token, app.secret, (err, decode) => {
			console.log(err, decode);
				if (err) res.status(400).send('Error: Invalid token!');
				next();
		});
	}
	else res.status(400).send('Undefined token!');


});

module.exports = authGuard;