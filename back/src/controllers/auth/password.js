const bcrypt = require('bcryptjs');

const checkPassword = async (senha, hash) => {
	const comparison = await bcrypt.compare(senha, hash);
	return comparison;
};

module.exports = { checkPassword };
