var Pivotal = require('pivotal')
  , actions = {
      show: function(req, res){
        if(!req.session.token){res.redirect('/')}
        Pivotal.useToken(req.session.token);
        Pivotal.getIterations(req.params.card,{group: '/current_backlog'}, function(err,results){
          if(err){throw err};
          res.render('cards/show.jade',{
            iterations: results.iteration
          , title: "Let's make a card wall"
          });
        });
      }
    , print: function(req, res){
        req.session.token = req.session.token || req.params.token
        if(!req.session.token){res.redirect('/')}
        Pivotal.useToken(req.session.token);
        Pivotal.getStory(req.params.tracker, req.params.story, function(err,results){
          if(err){throw err};
          res.render('cards/print.jade',{
            story: results
          , title: "Let's make a card wall"
          });
        });
      }
    };

module.exports = actions;
