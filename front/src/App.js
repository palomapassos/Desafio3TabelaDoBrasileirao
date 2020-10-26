import React from "react";
import "./App.css";
import Cabecalho from "./cabecalho/cabecalho";
import TabelaRodadas from "./rodadas/rodadas";
import TabelaClassificacao from "./classificacao/classificacao";
import Requisicoes from "./utils/requisicoes";

function App() {
	const [rodada, setRodada] = React.useState(1);
	const [jogosRodada, setJogosRodada] = React.useState([]);
	const [tabelaClassificacao, setTabelaClassificacao] = React.useState([]);
	const [token, setToken] = React.useState(null);

	function atualizarDados() {
		Requisicoes.fazerRequisicaoGET(`http://localhost:8081/classificacao`).then(
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
	}

	function atualizarRodadas() {
		Requisicoes.fazerRequisicaoGET(
			`http://localhost:8081/jogos/${rodada}`
		).then(({ dados }) => {
			setJogosRodada(dados);
		});
	}

	React.useEffect(() => {
		atualizarRodadas();
		atualizarDados();
	}, []);

	return (
		<div className="conteudo">
			<Cabecalho token={token} setToken={setToken} />
			<div className="principal">
				<div className="centro">
					<TabelaRodadas
						token={token}
						setToken={setToken}
						rodada={rodada}
						setRodada={setRodada}
						jogosRodada={jogosRodada}
						setJogosRodada={setJogosRodada}
						atualizarDados={atualizarDados}
						atualizarRodadas={atualizarRodadas}
					/>
					<TabelaClassificacao
						tabelaClassificacao={tabelaClassificacao}
						setTabelaClassificacao={setTabelaClassificacao}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
