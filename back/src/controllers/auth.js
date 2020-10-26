const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const Password = require('./auth/password');
const Users = require('../repositories/users');
require('dotenv').config();

const autenticacao = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;

	if (!email || !senha) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	const user = await Users.obterUsuarioPorEmail(email);

	if (user) {
		const comparacao = await Password.checkPassword(senha, user.senha);
		if (comparacao) {
			const token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET || 'cubosacademydesafio3',
				{ expiresIn: '1h' }
			);

			return response(ctx, 200, { token });
		}
	}

	return response(ctx, 200, {
		mensagem: 'Informações de email ou senha incorretas',
	});
};

module.exports = { autenticacao };
