#!/usr/bin/env node

var _ = require('underscore')
  , express = require('express')
  , Resource = require('express-resource')
  , Redis = require('redis')
  , RedisStore = require('connect-redis')(express)
  , Pivotal = require('pivotal')
  , mongoose = require('mongoose')
  , everyauth = require('everyauth')
  , app = module.exports = express.createServer()
  , sockjs = require('sockjs')
  , sockjs_opts = {sockjs_url: "http://majek.github.com/sockjs-client/sockjs-latest.min.js"}
  , dir = __dirname
  , app_root = dir + '/app'
  , conf = {
         express: express
       , Resource: Resource
       , Redis: Redis
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


global.crypto = require('crypto');

app.dir = __dirname;
app.gameSocketServers = {};
app.sjs = sockjs;
app.db = mongoose;
app.port = process.env.PORT || 3000;

// Global objects
global.app = app;
global._ = _;
// Models
require('./config/models.js').config(conf);
// Configuration
require('./config/app.js').config(conf);
// Routes
require('./config/routes.js').routes(conf);

//Index resources
app.listen(app.port);
console.log("Pivotal Poker:\nlistening on port %d in %s mode", app.address().port, app.settings.env);
