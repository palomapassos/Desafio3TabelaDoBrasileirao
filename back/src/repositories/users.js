const database = require('../utils/database');

const obterUsuarioPorEmail = async (email = null) => {
	if (!email) {
		return null;
	}

	const query = `SELECT * FROM users WHERE email = $1`;
	const resultado = await database.query({
		text: query,
		values: [email],
	});

	return resultado.rows.shift();
};

module.exports = { obterUsuarioPorEmail };
