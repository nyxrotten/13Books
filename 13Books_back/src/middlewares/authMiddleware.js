const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {

	const token = req.headers['x-access-token'];

	if (!token) return res.status(401).json({ msg: 'No hay token de acceso.' })

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token no válido.' })
	}
}

module.exports = authToken;