var Pivotal = require('pivotal')
  , Socket  = require('./sockets.js');

var actions = {
  index: function( req, res ){
    if(!req.session.token){res.redirect('/')}
    Pivotal.useToken(req.session.token);
    Pivotal.getProjects(function(err,results){
      res.render('projects/index',{
        title: 'Projects'
      , projects: results.project
      , trackerId: req.session.token
      });
    });
  },

  show: function( req, res){
    //
    if(!req.session.token){res.redirect('/')}
    Pivotal.useToken(req.session.token);
    Pivotal.getProject(req.params.project,function(er, project){
      Pivotal.getIterations(req.params.project,{group: '/current_backlog'}, function(err,results){
        res.render('projects/show',{
          iterations: results.iteration
        , projectId: req.params.project
        , session: req.session
        , project: project
        , title: "Let's Have an IPM meeting and plan an IPM"
        , trackerId: req.session.token
        });
      });
    });

    if(!app.gameSocketServers[req.params.project]){
      var sockjs_opts = {sockjs_url: "http://majek.github.com/sockjs-client/sockjs-latest.min.js"}
      , server = app.sjs.createServer(sockjs_opts);

      app.redis.hmset('ipm'+req.params.project.toString(), "slide", 0, "users", {})

      server.on('connection', function(conn) {

        server.on('present', function(data){
          conn.write(JSON.stringify(data));
        });

        conn.on('data', function(m){
          Socket.switch(m,server);
        });
      });

      server.installHandlers(app, {prefix:'[/]ipm/' + req.params.project});
      app.gameSocketServers[req.params.project] = server;
    }
  }
, stats: function(req, res){
    if(!req.session.token){res.redirect('/')}
    Pivotal.useToken(req.session.token);
    Pivotal.getProject(req.params.project,function(er, project){
      Pivotal.getIterations(req.params.project,{group: '/current_backlog'}, function(err,results){
        res.render('projects/stats',{ 
            project: project
          , iterations: results
          , title: 'Factables'});
      });
    });
}

}
module.exports = actions;
