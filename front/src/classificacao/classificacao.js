import React from "react";
import "../App.css";

function TabelaClassificacao(props) {
	const [metodoDeOrdenacao, setMetodoDeOrdenacao] = React.useState("posicao");
	const [ordem, setOrdem] = React.useState("crescente");
	const { tabelaClassificacao, setTabelaClassificacao } = props;

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
	);
}

export default TabelaClassificacao;
