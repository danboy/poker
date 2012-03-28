var express = require('express');
module.exports.config = function(c){

  var app = c.app
    , express = c.express
    , Redis = c.Redis
    , RedisStore = c.RedisStore;

  app.configure(function(){
    app.set('views', c.paths.views);
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ store: new RedisStore, secret: 'applesauce' }));
    app.use(app.router);
    app.use(require('stylus').middleware({
      src: app.dir + '/public/css/stylus/'
    , dest: app.dir + '/public'
    , debug: true
    , force: true
    }));
    app.use(express.static( c.paths.dir + '/public' ));
  });

  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  });

  app.configure('production', function(){
    app.use(express.errorHandler()); 
  });

  app.dynamicHelpers({
    messages: require('express-messages')

  , hasToken: function (req, res){
      return req.session.token;
    }
  , user: function(req, res){
      return req.session.user
    }
  });

  app.get( '/logout', function(req, res){
    req.session.token = null;
    res.redirect('/');
  });
  
  app.redis = Redis.createClient();
  
}
