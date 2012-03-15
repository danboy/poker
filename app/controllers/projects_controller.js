var Pivotal = require('pivotal');

var actions = {
  index: function( req, res ){
    Pivotal.useToken(req.session.token);
    Pivotal.getProjects(function(err,results){
      res.render('projects/index',{
        title: 'Projects'
      , projects: results.project
      , trackerId: req.session.token
      });
    });
  },

  new: function( req, res ){
    //
  },

  create: function( req, res){
    //
  },

  show: function( req, res){
    //
    Pivotal.useToken(req.session.token);
    Pivotal.getIterations(req.params.project,{group: '/current_backlog'}, function(err,results){
      res.render('projects/show',{
        iterations: results.iteration
      , projectId: req.params.project
      , title: "Let's Have an IPM meeting and plan an IPM"
      , trackerId: req.session.token
      });
    });

    if(!app.gameSocketServers[req.params.project]){
      var sockjs_opts = {sockjs_url: "http://majek.github.com/sockjs-client/sockjs-latest.min.js"};
      var server = app.sjs.createServer(sockjs_opts);

      server.on('connection', function(conn) {
        server.on('start', function(data){
          conn.write(JSON.stringify(data));
        });
      });

      server.installHandlers(app, {prefix:'[/]game_socket/' + req.params.project});
      app.gameSocketServers[req.params.project] = server;
    }
  },
  startGame: function(req,res){
    server = app.gameSocketServers[req.body.projectId];
    server.emit('start',{'instruction': req.body.instruction, 'slide': req.body.slide})
  }

}
module.exports = actions;
