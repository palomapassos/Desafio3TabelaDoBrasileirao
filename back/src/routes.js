const Router = require('koa-router');

const router = new Router();

const Jogos = require('./controllers/jogos');
const Classificacao = require('./controllers/clasificacao');
const Autenticacao = require('./controllers/auth');
const Session = require('./middlewares/session');

router.post('/auth', Autenticacao.autenticacao);

router.get('/classificacao', Classificacao.classificacao);

router.get('/jogos/:rodada', Jogos.obterJogosPorRodada);
router.get('/jogos', Jogos.obterTodosOsJogos);
router.put('/jogos', Session.vericar, Jogos.atualizarJogo);
router.post('/jogos', Session.vericar, Jogos.criarJogo);
router.delete('/jogos/:id', Session.vericar, Jogos.deletarJogo);

module.exports = router;
