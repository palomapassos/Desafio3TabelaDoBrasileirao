import React from "react";
import "./App.css";

const fazerRequisicaoGET = (url) =>
	fetch(url).then((resposta) => resposta.json());

function fazerRequisicaoComBody(url, metodo, conteudo, token) {
	return fetch(url, {
		method: metodo,
		headers: {
			"Content-Type": "application/json",
			Authorization: token && `Bearer ${token}`,
		},
		body: JSON.stringify(conteudo),
	}).then((resposta) => resposta.json());
}

function fazerRequisicaoDelete(url, metodo, token) {
	return fetch(url, {
		method: metodo,
		headers: {
			"Content-Type": "application/json",
			Authorization: token && `Bearer ${token}`,
		},
	}).then((resposta) => resposta.json());
}

function App() {
	const [rodada, setRodada] = React.useState(1);
	const [jogosRodada, setJogosRodada] = React.useState([]);
	const [token, setToken] = React.useState(null);
	const [email, setEmail] = React.useState("");
	const [senha, setSenha] = React.useState("");
	const [metodoDeOrdenacao, setMetodoDeOrdenacao] = React.useState("posicao");
	const [ordem, setOrdem] = React.useState("crescente");
	const [tabelaClassificacao, setTabelaClassificacao] = React.useState([]);
	const [editar, setEditar] = React.useState(false);
	const [adicionar, setAdicionar] = React.useState(false);
	const [idJogo, setIdJogo] = React.useState(0);
	const [inputGolsCasa, setInputGolsCasa] = React.useState(0);
	const [inputGolsVis, setInputGolsVis] = React.useState(0);
	const [inputTimeCasa, setInputTimeCasa] = React.useState("");
	const [inputTimeVis, setInputTimeVis] = React.useState("");

	const atualizarDados = () => {
		fazerRequisicaoGET(`http://localhost:8081/classificacao`).then(
			({ dados }) => {
				const novosDados = dados.map((dado, posicao) => {
					return {
						...dado,
						posicao: posicao + 1,
					};
				});

				console.log(novosDados);

				setTabelaClassificacao(novosDados);
			}
		);
	};

	const atualizarRodadas = () => {
		fazerRequisicaoGET(`http://localhost:8081/jogos/${rodada}`).then(
			({ dados }) => {
				setJogosRodada(dados);
			}
		);
	};

	React.useEffect(() => {
		atualizarRodadas();
	}, [rodada]);

	React.useEffect(() => {
		atualizarRodadas();
		atualizarDados();
	}, []);

	const ordenaTabela = (coluna, ordemColuna) => {
		let novaTabela = [];
		switch (coluna) {
			case "pontos":
				novaTabela = tabelaClassificacao.sort((timeA, timeB) =>
					timeA.pontos > timeB.pontos ? -1 : 1
				);
				break;

			case "vitorias":
				novaTabela = tabelaClassificacao.sort((timeA, timeB) =>
					timeA.vitorias > timeB.vitorias ? -1 : 1
				);

				break;
			case "empates":
				novaTabela = tabelaClassificacao.sort((timeA, timeB) =>
					timeA.empates > timeB.empates ? -1 : 1
				);

				break;
			case "derrotas":
				novaTabela = tabelaClassificacao.sort((timeA, timeB) =>
					timeA.derrotas > timeB.derrotas ? -1 : 1
				);

				break;

			case "gf":
				novaTabela = tabelaClassificacao.sort((timeA, timeB) =>
					timeA.golsFeitos > timeB.golsFeitos ? -1 : 1
				);

				break;

			case "gs":
				novaTabela = tabelaClassificacao.sort((timeA, timeB) =>
					timeA.golsSofridos > timeB.golsSofridos ? -1 : 1
				);

				break;

			case "sg":
				novaTabela = tabelaClassificacao.sort((timeA, timeB) =>
					timeA.golsFeitos - timeA.golsSofridos >
					timeB.golsFeitos - timeB.golsSofridos
						? -1
						: 1
				);

				break;

			case "time":
				novaTabela = tabelaClassificacao.sort((timeA, timeB) =>
					timeB.nome.localeCompare(timeA.nome)
				);

				break;

			default:
				novaTabela = tabelaClassificacao.sort((timeA, timeB) =>
					timeA.posicao > timeB.posicao ? -1 : 1
				);

				break;
		}

		setMetodoDeOrdenacao(coluna);
		setOrdem(ordemColuna);
		if (ordemColuna === "crescente") {
			setTabelaClassificacao(novaTabela.reverse());
		} else {
			setTabelaClassificacao(novaTabela);
		}
	};

	const ordenar = (coluna) => {
		if (metodoDeOrdenacao === coluna) {
			{
				return (
					<img
						onClick={() => {
							ordenaTabela(
								coluna,
								ordem === "crescente" ? "decrescente" : "crescente"
							);
						}}
						src={
							ordem === "decrescente"
								? "https://systemuicons.com/images/icons/arrow_down.svg"
								: "https://systemuicons.com/images/icons/arrow_up.svg"
						}
					/>
				);
			}
		} else {
			return (
				<img
					src="https://systemuicons.com/images/icons/sort.svg"
					onClick={() => {
						ordenaTabela(coluna, "decrescente");
					}}
				/>
			);
		}
	};

	return (
		<div className="conteudo">
			<div className="cabecalho">
				<div className="centro">
					<div className="brasileirao">
						<img src="https://logospng.org/download/brasileirao-serie-a/logo-brasileirao-256.png" />
						<h1>Brasileirão</h1>
					</div>
					{!token ? (
						<form
							className="login"
							onSubmit={(event) => {
								event.preventDefault();
								fazerRequisicaoComBody("http://localhost:8081/auth", "POST", {
									email,
									senha,
								}).then(({ dados }) => {
									dados.token
										? setToken(dados.token)
										: alert("Email ou senha incorretos");
									setEmail("");
									setSenha("");
								});
							}}
						>
							<label>
								<span>Email</span>
								<input
									type="email"
									value={email}
									onInput={(event) => setEmail(event.target.value)}
								/>
							</label>
							<label>
								<span>Senha</span>
								<input
									type="password"
									value={senha}
									onInput={(event) => setSenha(event.target.value)}
								/>
							</label>
							<button>Logar</button>
						</form>
					) : (
						<button
							onClick={() => {
								setToken(null);
							}}
						>
							Deslogar
						</button>
					)}
				</div>
			</div>
			<div className="principal">
				<div className="centro">
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
																		setInputGolsCasa(
																			Number(event.target.value)
																		);
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
																		fazerRequisicaoComBody(
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
																		fazerRequisicaoComBody(
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
																		setInputGolsCasa(
																			Number(event.target.value)
																		);
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
																		fazerRequisicaoComBody(
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

					<table className="classificacao">
						<thead>
							<tr className="cabecalhoClassificacao">
								<th>Posição {ordenar("posicao")}</th>
								<th>Time {ordenar("time")}</th>
								<th>
									<abbr title="Pontos">PTS</abbr> {ordenar("pontos")}
								</th>
								<th>
									<abbr title="Empates">E</abbr> {ordenar("empates")}
								</th>
								<th>
									<abbr title="Vitórias">V</abbr> {ordenar("vitorias")}
								</th>
								<th>
									<abbr title="Derrotas">D</abbr> {ordenar("derrotas")}
								</th>
								<th>
									<abbr title="Gols Feitos">GF</abbr> {ordenar("gf")}
								</th>
								<th>
									<abbr title="Gols Sofridos">GS</abbr> {ordenar("gs")}
								</th>
								<th>
									<abbr title="Saldo de Gols">SG</abbr> {ordenar("sg")}
								</th>
							</tr>
						</thead>
						<tbody className="timesClassificacao">
							{tabelaClassificacao &&
								tabelaClassificacao.map((time) => {
									return (
										<tr
											className={
												time.posicao < 5
													? "classificados"
													: time.posicao > 16
													? "rebaixados"
													: undefined
											}
										>
											<td>{time.posicao}</td>
											<td>{time.nome}</td>
											<td>{time.pontos}</td>
											<td>{time.empates}</td>
											<td>{time.vitorias}</td>
											<td>{time.derrotas}</td>
											<td>{time.golsFeitos}</td>
											<td>{time.golsSofridos}</td>
											<td>{time.golsFeitos - time.golsSofridos}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default App;
