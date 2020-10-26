const confereTimes = (time) => {
	if (
		time !== 'Athletico-PR' &&
		time !== 'Atlético-MG' &&
		time !== 'Avaí' &&
		time !== 'Bahia' &&
		time !== 'Botafogo' &&
		time !== 'Ceará' &&
		time !== 'Chapecoense' &&
		time !== 'Corinthians' &&
		time !== 'Cruzeiro' &&
		time !== 'CSA' &&
		time !== 'Flamengo' &&
		time !== 'Fluminense' &&
		time !== 'Fortaleza' &&
		time !== 'Goiás' &&
		time !== 'Grêmio' &&
		time !== 'Inter-RS' &&
		time !== 'Palmeiras' &&
		time !== 'Santos' &&
		time !== 'São Paulo' &&
		time !== 'Vasco'
	) {
		return false;
	}

	return true;
};

module.exports = { confereTimes };
