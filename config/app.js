var express = require('express');
module.exports.config = function(c){

  var app = c.app
    , express = c.express
    , everyauth = c.everyauth
    , RedisStore = c.RedisStore

  require('../lib/auth.js').auth({
      everyauth: everyauth
    , app: app
  });

  app.configure(function(){
    app.set('views', c.paths.views);
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ store: new RedisStore, secret: 'applesauce' }));
    app.use(everyauth.middleware());
    app.use(app.router);
    app.use(express.static( c.paths.dir + '/public' ));
  });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

  app.configure('production', function(){
    app.use(express.errorHandler()); 
  });
  everyauth.helpExpress(app);
  var estimates = [];
  app.sjs.on('open', function(conn) {
    conn.on('message', function(e) {
      estimates.push({id:e.data.id,estimate:e.data.estimate});
      conn.send(estimates);
    });
  });
}
