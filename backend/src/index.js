// const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
var session = require('koa-generic-session');
var redisStore = require('koa-redis');

const PORT = process.env.PORT || 8000;

const app = new Koa();

router.get('/api/', async ctx => {
});

app.keys = ['keys', 'keykeys'];
app.use(session({
  store: redisStore({
    // Options specified here
  }),
}));

app.use(function * () {
  switch (this.path) {
    case '/get':
      get.call(this);
      break;
    case '/remove':
      remove.call(this);
      break;
    case '/regenerate':
      yield regenerate.call(this);
      break;
  }
});

function get () {
  var session = this.session;
  session.count = session.count || 0;
  session.count++;
  this.body = session.count;
}

function remove () {
  this.session = null;
  this.body = 0;
}

function * regenerate () {
  get.call(this);
  yield this.regenerateSession();
  get.call(this);
}

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);

console.log(`App listening on port ${PORT}`);
