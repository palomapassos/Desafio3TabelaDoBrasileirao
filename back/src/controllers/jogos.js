const response = require('../utils/response');
const Jogos = require('../repositories/jogos');
const confere = require('../controllers/jogos/confereTimes');

const obterJogosPorRodada = async (ctx) => {
	const { rodada = null } = ctx.params;

	if (rodada) {
		const resultado = await Jogos.obterJogosPorRodada(rodada);
		if (resultado) {
			return response(ctx, 200, resultado);
		}

		return response(ctx, 404, { mensagem: 'Rodada inexistente nos dados' });
	}

	return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
};

const obterTodosOsJogos = async (ctx) => {
	const resultado = await Jogos.obterTodosOsJogos();
	if (resultado) {
		return response(ctx, 200, resultado);
	}

	return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
};

const atualizarJogo = async (ctx) => {
	const { id, gols_casa, gols_visitante } = ctx.request.body;

	if (
		!id ||
		(!gols_casa && gols_casa !== 0) ||
		(!gols_visitante && gols_visitante !== 0)
	) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	if (id) {
		const jogo = await Jogos.obterJogo(id);

		if (jogo) {
			const jogoAlterado = {
				...jogo,
				gols_casa: gols_casa
					? gols_casa
					: gols_casa === 0
					? 0
					: jogo.gols_casa,
				gols_visitante: gols_visitante
					? gols_visitante
					: gols_visitante === 0
					? 0
					: jogo.gols_visitante,
			};

			const resultado = await Jogos.atualizarJogo(jogoAlterado);
			return response(ctx, 200, resultado);
		}

		return response(ctx, 404, { mensagem: 'Jogo inexistente nos dados' });
	}

	return response(ctx, 404, { mensagem: 'Jogo inexistente nos dados' });
};

const criarJogo = async (ctx) => {
	const {
		time_casa = null,
		gols_casa = null,
		gols_visitante = null,
		time_visitante = null,
		rodada = null,
	} = ctx.request.body;

	if (
		!time_casa ||
		(!gols_casa && gols_casa !== 0) ||
		(!gols_visitante && gols_visitante !== 0) ||
		!time_visitante ||
		!rodada
	) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
	}

	if (
		!confere.confereTimes(time_casa) ||
		!confere.confereTimes(time_visitante)
	) {
		return response(ctx, 400, {
			mensagem:
				'Pedido mal formatado, time não disponível na série A de 2019',
		});
	}

	const jogo = {
		time_casa,
		gols_casa,
		gols_visitante,
		time_visitante,
		rodada,
	};

	const resultado = await Jogos.criarJogo(jogo);

	return response(ctx, 201, resultado);
};

const deletarJogo = async (ctx) => {
	const { id = null } = ctx.params;

	if (id) {
		const resultado = await Jogos.deletarJogo(id);
		if (resultado) {
			return response(ctx, 200, { mensagem: `Jogo ${id} deletado` });
		} else {
			return response(ctx, 404, { mensagem: 'Jogo não encontrado ' });
		}
	}

	return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
};

module.exports = {
	obterJogosPorRodada,
	obterTodosOsJogos,
	atualizarJogo,
	criarJogo,
	deletarJogo,
};
