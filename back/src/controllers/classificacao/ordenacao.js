const ordenaTabela = (timeA, timeB) => {
	if (timeA.pontos === timeB.pontos) {
		if (timeA.vitorias === timeB.vitorias) {
			if (
				timeA.golsFeitos - timeA.golsSofridos ===
				timeB.golsFeitos - timeB.golsSofridos
			) {
				if (timeA.golsFeitos === timeB.golsFeitos) {
					return timeA.nome.localeCompare(timeB);
				} else {
					return timeA.golsFeitos > timeB.golsFeitos ? -1 : 1;
				}
			} else {
				return timeA.golsFeitos - timeA.golsSofridos >
					timeB.golsFeitos - timeB.golsSofridos
					? -1
					: 1;
			}
		} else {
			return timeA.vitorias > timeB.vitorias ? -1 : 1;
		}
	} else {
		return timeA.pontos > timeB.pontos ? -1 : 1;
	}
};

module.exports = {
	ordenaTabela,
};
