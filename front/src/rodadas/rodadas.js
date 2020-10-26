import React from "react";
import "../App.css";
import Requisicoes from "../utils/requisicoes";

function TabelaRodadas(props) {
	const [editar, setEditar] = React.useState(false);
	const [adicionar, setAdicionar] = React.useState(false);
	const [idJogo, setIdJogo] = React.useState(0);
	const [inputGolsCasa, setInputGolsCasa] = React.useState(0);
	const [inputGolsVis, setInputGolsVis] = React.useState(0);
	const [inputTimeCasa, setInputTimeCasa] = React.useState("");
	const [inputTimeVis, setInputTimeVis] = React.useState("");
	const {
		rodada,
		setRodada,
		jogosRodada,
		setJogosRodada,
		token,
		atualizarDados,
		atualizarRodadas,
	} = props;

	React.useEffect(() => {
		atualizarRodadas();
	}, [rodada]);

	return (
		<div className="rodadas">
			<div className="cabecalhoRodadas">
				<img
					src="https://systemuicons.com/images/icons/arrow_left.svg"
					onClick={() => {
						if (rodada > 1) {
							setRodada(rodada - 1);
						}
					}}
				/>
				<h2>{rodada}ª Rodada</h2>
				<img
					src="https://systemuicons.com/images/icons/arrow_right.svg"
					onClick={() => {
						if (rodada < 38) {
							setRodada(rodada + 1);
						}
					}}
				/>
			</div>
			<div className="tabelaRodadas">
				<table>
					{token ? (
						<tbody>
							{jogosRodada &&
								jogosRodada.map((jogo) => {
									if (editar && jogo.id === idJogo) {
										return (
											<tr>
												<td>
													<img src={jogo.logo_casa} />
												</td>
												<td>{jogo.time_casa}</td>
												<td className="placar">
													<input
														value={inputGolsCasa}
														onInput={(event) => {
															setInputGolsCasa(Number(event.target.value));
														}}
													/>
												</td>
												<td>x</td>
												<td className="placar">
													<input
														value={inputGolsVis}
														onInput={(event) => {
															setInputGolsVis(Number(event.target.value));
														}}
													/>
												</td>
												<td>{jogo.time_visitante}</td>
												<td>
													<img src={jogo.logo_visitante} />
												</td>
												<td>
													<img
														src="https://systemuicons.com/images/icons/check.svg"
														onClick={async () => {
															Requisicoes.fazerOutrasRequisicoes(
																`http://localhost:8081/jogos`,
																"PUT",
																{
																	id: idJogo,
																	gols_casa: inputGolsCasa,
																	gols_visitante: inputGolsVis,
																},
																token
															).then((resposta) => {
																atualizarDados();
																atualizarRodadas();
															});
															setJogosRodada(jogosRodada);
															setEditar(false);
														}}
													/>
												</td>
												<td>
													<img
														src="https://systemuicons.com/images/icons/cross.svg"
														onClick={async () => {
															Requisicoes.fazerOutrasRequisicoes(
																`http://localhost:8081/jogos/${idJogo}`,
																"DELETE",
																{},
																token
															).then(({ dados }) => {
																atualizarDados();
																atualizarRodadas();
															});
															setJogosRodada(jogosRodada);
															setEditar(false);
														}}
													/>
												</td>
											</tr>
										);
									} else if (adicionar && jogo.id === idJogo) {
										return (
											<tr>
												<td>
													<img src="https://logospng.org/download/brasileirao-serie-a/logo-brasileirao-2048.png" />
												</td>
												<td>
													<input
														value={inputTimeCasa}
														onInput={(event) => {
															setInputTimeCasa(event.target.value);
														}}
													/>
												</td>
												<td className="placar">
													<input
														value={inputGolsCasa}
														onInput={(event) => {
															setInputGolsCasa(Number(event.target.value));
														}}
													/>
												</td>
												<td>x</td>
												<td className="placar">
													<input
														value={inputGolsVis}
														onInput={(event) => {
															setInputGolsVis(Number(event.target.value));
														}}
													/>
												</td>
												<td>
													<input
														value={inputTimeVis}
														onInput={(event) => {
															setInputTimeVis(event.target.value);
														}}
													/>
												</td>
												<td>
													<img src="https://logospng.org/download/brasileirao-serie-a/logo-brasileirao-2048.png" />
												</td>
												<td>
													<img
														src="https://systemuicons.com/images/icons/check.svg"
														onClick={async () => {
															Requisicoes.fazerOutrasRequisicoes(
																`http://localhost:8081/jogos`,
																"POST",
																{
																	time_casa: inputTimeCasa,
																	gols_casa: inputGolsCasa,
																	gols_visitante: inputGolsVis,
																	time_visitante: inputTimeVis,
																	rodada: rodada,
																},
																token
															).then((resposta) => {
																atualizarDados();
																atualizarRodadas();
															});
															setJogosRodada(jogosRodada);
															setAdicionar(false);
														}}
													/>
												</td>
											</tr>
										);
									} else {
										return (
											<tr>
												<td>
													<img src={jogo.logo_casa} />
												</td>
												<td>{jogo.time_casa}</td>
												<td className="placar">{jogo.gols_casa}</td>
												<td>x</td>
												<td className="placar">{jogo.gols_visitante}</td>
												<td>{jogo.time_visitante}</td>
												<td>
													<img src={jogo.logo_visitante} />
												</td>
												<td>
													<img
														src="https://systemuicons.com/images/icons/pen.svg"
														onClick={() => {
															setIdJogo(jogo.id);
															setInputGolsCasa(jogo.gols_casa);
															setInputGolsVis(jogo.gols_visitante);
															setEditar(true);
														}}
													/>
												</td>
												<td>
													<img
														src="https://systemuicons.com/images/icons/plus.svg"
														onClick={() => {
															setIdJogo(jogo.id);
															setAdicionar(true);
														}}
													/>
												</td>
											</tr>
										);
									}
								})}
						</tbody>
					) : (
						<tbody>
							{jogosRodada &&
								jogosRodada.map((jogo) => {
									return (
										<tr>
											<td>
												<img src={jogo.logo_casa} />
											</td>
											<td>{jogo.time_casa}</td>
											<td className="placar">{jogo.gols_casa}</td>
											<td>x</td>
											<td className="placar">{jogo.gols_visitante}</td>
											<td>{jogo.time_visitante}</td>
											<td>
												<img src={jogo.logo_visitante} />
											</td>
										</tr>
									);
								})}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
}

export default TabelaRodadas;
