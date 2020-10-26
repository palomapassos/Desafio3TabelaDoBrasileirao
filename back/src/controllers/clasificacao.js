const response = require('../utils/response');
const Jogos = require('../repositories/jogos');
const Classificacao = require('./classificacao/montaTabela');
const Ordenar = require('./classificacao/ordenacao');

const classificacao = async (ctx) => {
	const jogos = await Jogos.obterTodosOsJogos();
	const tabela = Classificacao.montaTabelaResultados(jogos);
	tabela.sort(Ordenar.ordenaTabela);
	return response(ctx, 200, tabela);
};

module.exports = { classificacao };
