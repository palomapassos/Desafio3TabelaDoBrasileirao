const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const Cors = require('@koa/cors');

const server = new Koa();

server.use(Cors());
server.use(bodyparser());
server.use(router.routes());

server.listen(8081, () => console.log('Servidor rodando!'));
