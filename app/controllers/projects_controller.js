var Pivotal = require('pivotal');

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
        , project: project
        , title: "Let's Have an IPM meeting and plan an IPM"
        , trackerId: req.session.token
        });
      });
    });

    if(!app.gameSocketServers[req.params.project]){
      var sockjs_opts = {sockjs_url: "http://majek.github.com/sockjs-client/sockjs-latest.min.js"}
      , server = app.sjs.createServer(sockjs_opts);

      app.redis.hmset('ipm'+req.params.project.toString(), {slide: 0, users: {}})

      server.on('connection', function(conn) {

        server.on('present', function(data){
          conn.write(JSON.stringify(data));
        });

        conn.on('data', function(m){
          app.redis.hgetall('ipm'+m.project, function(err, obj){
            server.emit('present',{'instruction': m.instruction, 'slide': m.slide});
            app.redis.hmset('ipm'+m.project, 'slide', obj.slide);
          });
        });
      });

      server.installHandlers(app, {prefix:'[/]ipm/' + req.params.project});
      app.gameSocketServers[req.params.project] = server;
    }
  }

}
module.exports = actions;
