var Pivotal = require('pivotal');

var actions = {
  index: function( req, res ){
    Pivotal.useToken(req.user.token);
    Pivotal.getProjects(function(err,results){
      res.render('trackers/index',{
        title: 'Projects'
      , trackers: results.project
      });
    });
      
  },

  new: function( req, res ){
    res.render('trackers/new',{
      title: "New Tracker"
    });
  },

  create: function( req, res){
    if(req.body.user){
      tracker = new Tracker(req.body.tracker);
      tracker.save(function(err){
      });
      res.redirect('/trackers/');
    }else{
      res.redirect('trackers/new');
    }

  },

  show: function( req, res){
    var trackerId = req.params.tracker;
    Pivotal.useToken(req.user.token);
    Pivotal.getIterations(trackerId,{group: '/current_backlog'}, function(err,results){
      res.render('trackers/show',{
        iterations: results.iteration
      , trackerId: trackerId
      , title: "Foo"
      });
    });

    if(!app.gameSocketServers[trackerId]){
      var sockjs_opts = {sockjs_url: "http://majek.github.com/sockjs-client/sockjs-latest.min.js"};
      var server = app.sjs.createServer(sockjs_opts);

      server.on('connection', function(conn) {
        server.on('start', function(data){
          conn.write(JSON.stringify(data));
        });
      });

      server.installHandlers(app, {prefix:'[/]game_socket/' + trackerId});
      app.gameSocketServers[trackerId] = server;
    }
  },

  getIteration: function( req, res){
  },

  startGame: function(req,res){
    console.log("ID",req.body.trackerId);
    server = app.gameSocketServers[req.body.trackerId];
    server.emit('start',{'instruction': req.body.instruction, 'slide': req.body.slide})
  },
  daysLeft: function(time){
  },
  getToken: function(req, res){
    Pivotal.getToken( req.body.username, req.body.password, function(token){
      res.send({token: token});
    });
  }
}
module.exports = actions;
