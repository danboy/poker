var everyauth = require('everyauth')
  , Pivotal = require('pivotal-tracker')
var actions = {
  index : function( req, res ){
    Pivotal.getProjects(req.user.token, function(results){
      res.render('trackers/index',{
        title: 'Projects'
      , trackers: results.projects.project
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
        console.log("SAVED:",tracker);
      });
      res.redirect('/trackers/');
    }else{
      res.redirect('trackers/new');
    }

  },

  show: function( req, res){
    Pivotal.getProject(req.params.tracker,req.user.token,function(tracker){
      Pivotal.getCurrentIteration(req.params.tracker,req.user.token,function(results){
        res.render('trackers/show',{
          title: 'Projects'
        , tracker: tracker.project
        , iteration: results.iterations.iteration[0]
        , stories: results.iterations.iteration[0].stories.story
        });
      });
    });
  },

  getIteration: function( req, res){
    Pivotal.getProject(req.body.tracker,req.user.token,function(project){
      Pivotal.getCurrentIteration(req.body.tracker,req.user.token,function(iterations){
        res.send({
          project: project
        , iterations: iterations  
        });
      });
    });
  },

  getToken: function(req,res){
    Pivotal.getToken(req.body.username,req.body.password,function(token){
      res.send({token: token});
    });
  
  }
}
module.exports = actions;
