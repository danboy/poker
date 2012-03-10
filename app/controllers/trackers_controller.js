var everyauth = require('everyauth')
  , Pivotal = require('pivotal')
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
      title: "New User"
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
    Pivotal.useToken(req.user.token);
    Pivotal.getIterations(req.params.tracker,{group: '/current_backlog'}, function(err,results){
      res.render('trackers/show',{
        iterations: results.iteration
      , title: "Foo"
      });
    });
  },

  getIteration: function( req, res){
  },

  getToken: function(req,res){
  },
  daysLeft: function(time){
  }
}
module.exports = actions;
