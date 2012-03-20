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
    if(!req.session.token){res.redirect('/')}
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
        var sockjs_opts = {sockjs_url: "http://majek.github.com/sockjs-client/sockjs-latest.min.js"}
        , server = app.sjs.createServer(sockjs_opts);
        console.log(req.params.project);
      app.redis.hmset('ipm'+req.params.project.toString(), {slide: 0, games: {}})
      server.on('connection', function(conn) {
        server.on('present', function(data){
          conn.write(JSON.stringify(data));
        });
      });

      server.installHandlers(app, {prefix:'[/]ipm/' + req.params.project});
      app.gameSocketServers[req.params.project] = server;
    }
  },
  present: function(req,res){
    var slide = 0;
    server = app.gameSocketServers[req.body.projectId];
    app.redis.hgetall('ipm'+req.body.projectId,function(err, obj){
      switch(req.body.instruction){
      case 'start':
        slide = (parseInt(obj.slide))+1;
        break;
      case 'next':
        slide = (parseInt(obj.slide))+1;
        break;
      case 'previous':
        slide = (parseInt(obj.slide))-1;
        break;
      default:
        slide = (parseInt(obj.slide));
        break;
      }
      server.emit('present',{'instruction': req.body.instruction, 'slide': slide})
      app.redis.hmset('ipm'+req.body.projectId.toString(), 'slide', slide);
    });
  }

}
module.exports = actions;
