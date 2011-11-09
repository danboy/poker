var _ = require('underscore')
  , express = require('express')
  , Resource = require('express-resource')
  , RedisStore = require('connect-redis')(express)
  , Pivotal = require('pivotal-tracker')
  , mongoose = require('mongoose')
  , everyauth = require('everyauth')
  , app = module.exports = express.createServer()
  , sockjs = require('sockjs')
  , sockjs_opts = {sockjs_url: "http://majek.github.com/sockjs-client/sockjs-latest.min.js"}
  , dir = __dirname
  , sjs = new sockjs.Server(sockjs_opts)
  , app_root = dir + '/app'
  , conf = {
         express: express
       , Resource: Resource
       , RedisStore: RedisStore
       , everyauth: everyauth
       , paths: {
           'dir'          : dir
         , 'views'        : app_root + '/views'
         , 'controllers'  : app_root + '/controllers'
         , 'lib'          : dir + '/lib'
       }
       , app: app
  };

sjs.installHandlers( app, {prefix:'[/]sock'} );

global.crypto = require('crypto');

// Global objects
global.app = app;
global._ = _;

app.sjs = sjs;
app.db = mongoose;

// Models
require('./config/models.js').config(conf);
// Configuration
require('./config/app.js').config(conf);
// Routes
require('./config/routes.js').routes(conf);

//Index resources
app.listen(3000);
console.log("Pivotal Poker:\nlistening on port %d in %s mode", app.address().port, app.settings.env);
