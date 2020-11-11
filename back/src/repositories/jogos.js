const { query } = require('../utils/database');
const database = require('../utils/database');

const obterJogosPorRodada = async (rodada = null) => {
	if (!rodada) {
		return null;
	}

	const query = `SELECT id_casa as id, time_casa, gols_casa, logo_casa, time_visitante, gols_visitante, logo_visitante, rodada 
					FROM (SELECT *
						FROM ( SELECT id as id_casa, time_casa, gols_casa, logo as logo_casa 
								FROM (
										SELECT * 
										FROM jogos 
										WHERE rodada = $1) as info_casa 
								inner join (SELECT * FROM times) as lg_casa
								on info_casa.time_casa = lg_casa.name) as casa
							inner join (SELECT id as id_visitante, time_visitante, gols_visitante, logo as logo_visitante, rodada
								FROM (
										SELECT * FROM jogos WHERE rodada = $1) as info_visitante 
								inner join (SELECT * FROM times) as lg_visitante
								on info_visitante.time_visitante = lg_visitante.name) as visitante
							on id_casa = id_visitante) as info_rodada
							order by rodada, id`;

	const resultado = await database.query({
		text: query,
		values: [rodada],
	});

	return resultado.rows[0];
};

const obterTodosOsJogos = async () => {
	const query = `SELECT * FROM jogos`;

	const resultado = await database.query(query);

	return resultado.rows;
};

const obterLogo = async (nomeTime = null) => {
	if (!nomeTime) {
		return null;
	}

	const query = `SELECT * FROM times WHERE name = $1`;

	const resultado = await database.query({
		text: query,
		values: [nomeTime],
	});

	return resultado.rows;
};

const obterJogo = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = `SELECT * FROM jogos WHERE id = $1`;

	const resultado = await database.query({
		text: query,
		values: [id],
	});

	return resultado.rows.shift();
};

const atualizarJogo = async (jogo) => {
	const { id, gols_casa, gols_visitante } = jogo;

	const query = `UPDATE jogos 
				SET gols_casa = $2,
				gols_visitante = $3
				WHERE id = $1
				RETURNING *`;

	const resultado = await database.query({
		text: query,
		values: [id, gols_casa, gols_visitante],
	});

	return resultado.rows.shift();
};

const criarJogo = async (jogo) => {
	const {
		time_casa,
		time_visitante,
		gols_casa,
		gols_visitante,
		rodada,
	} = jogo;

	console.log(time_casa, time_visitante, gols_casa, gols_visitante, rodada);

	const query = `INSERT INTO jogos (time_casa, gols_casa, gols_visitante, time_visitante, rodada)
			 VALUES($1, $2, $3, $4, $5)
			 RETURNING *`;

	const resultado = await database.query({
		text: query,
		values: [time_casa, gols_casa, gols_visitante, time_visitante, rodada],
	});

	return resultado.rows.shift();
};

const deletarJogo = async (id = null) => {
	if (!id) {
		return null;
	}

	const query = 'DELETE FROM jogos WHERE id = $1';

	const resultado = await database.query({
		text: query,
		values: [id],
	});

	return true;
};

module.exports = {
	obterJogosPorRodada,
	obterTodosOsJogos,
	obterJogo,
	atualizarJogo,
	obterLogo,
	criarJogo,
	deletarJogo,
};
