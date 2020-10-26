const jwt = require('jsonwebtoken');
const response = require('../utils/response');

const vericar = async (ctx, next) => {
	if (ctx.headers.authorization) {
		const [bearer, token] = ctx.headers.authorization.split(' ');

		try {
			const verificacao = await jwt.verify(token, process.env.JWT_SECRET);
			ctx.state.email = verificacao.email;
		} catch (err) {
			console.log(err);
			return response(ctx, 403, { mensagem: 'Ação Proibida' });
		}

		return next();
	}

	return response(ctx, 403, { mensagem: 'Ação Proibida' });
};

module.exports = { vericar };
