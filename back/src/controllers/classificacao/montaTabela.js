//* Tabela de resultado dos times na temporada */

const analisaTabela = (tabelaResultados, jogo, nomeTime) => {
	let timeEncontrado = tabelaResultados.find(
		(time) => time.nome === nomeTime
	);

	let pontos = 0;
	let golsFeitos = 0;
	let golsSofridos = 0;

	if (nomeTime === jogo.time_casa) {
		golsFeitos = jogo.gols_casa;
		golsSofridos = jogo.gols_visitante;

		if (jogo.gols_casa > jogo.gols_visitante) {
			pontos = 3;
		} else if (jogo.gols_casa < jogo.gols_visitante) {
			pontos = 0;
		} else {
			pontos = 1;
		}
	} else {
		golsFeitos = jogo.gols_visitante;
		golsSofridos = jogo.gols_casa;

		if (jogo.gols_casa < jogo.gols_visitante) {
			pontos = 3;
		} else if (jogo.gols_casa > jogo.gols_visitante) {
			pontos = 0;
		} else {
			pontos = 1;
		}
	}

	if (!timeEncontrado) {
		tabelaResultados.push({
			nome: nomeTime,
			jogos: 1,
			pontos: pontos,
			vitorias: pontos === 3 ? 1 : 0,
			derrotas: pontos === 0 ? 1 : 0,
			empates: pontos === 1 ? 1 : 0,
			golsFeitos,
			golsSofridos,
		});
	} else {
		timeEncontrado.jogos += 1;
		timeEncontrado.golsFeitos += golsFeitos;
		timeEncontrado.golsSofridos += golsSofridos;
		timeEncontrado.pontos += pontos;
		if (pontos === 3) {
			timeEncontrado.vitorias += 1;
		} else if (pontos === 1) {
			timeEncontrado.empates += 1;
		} else {
			timeEncontrado.derrotas += 1;
		}
	}
};

const montaTabelaResultados = (jogos) => {
	const tabelaResultados = [];
	jogos.forEach((jogo) => {
		analisaTabela(tabelaResultados, jogo, jogo.time_casa);
		analisaTabela(tabelaResultados, jogo, jogo.time_visitante);
	});

	return tabelaResultados;
};

module.exports = { montaTabelaResultados };
