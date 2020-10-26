import React from "react";
import "../App.css";
import Requisicoes from "../utils/requisicoes";

function Cabecalho(props) {
	const [email, setEmail] = React.useState("");
	const [senha, setSenha] = React.useState("");
	const { token, setToken } = props;
	return (
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
							Requisicoes.fazerOutrasRequisicoes(
								"http://localhost:8081/auth",
								"POST",
								{
									email,
									senha,
								}
							).then(({ dados }) => {
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
	);
}

export default Cabecalho;
