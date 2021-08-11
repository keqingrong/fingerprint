const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const address = require('address');

const app = new Koa();
const router = new Router();

app.use(logger());
app.use(
  cors({
    credentials: true,
  })
);
app.use(
  koaBody({
    multipart: true,
  })
);
app.use(router.routes());
app.use(router.allowedMethods({}));

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
});

router.get('/ip', (ctx, next) => {
  ctx.body = {
    success: true,
    data: ctx.request.ip,
  };
});

const db = {};

router.post('/saveReferral', (ctx, next) => {
  const { code, payload } = ctx.request.body;
  if (code) {
    db[code] = payload;
    ctx.body = {
      success: true,
      data: null,
    };
  } else {
    ctx.body = {
      success: false,
      data: null,
    };
  }
});

router.get('/getReferral', (ctx, next) => {
  const { code } = ctx.query;
  if (code && db[code]) {
    ctx.body = {
      success: true,
      data: db[code],
    };
  } else {
    ctx.body = {
      success: false,
      data: null,
    };
  }
});

app.listen(8000);

console.log(`Server is running`);
console.log(`LOCAL  http://localhost:8000`);
console.log(`LAN    http://${address.ip()}:8000`);
