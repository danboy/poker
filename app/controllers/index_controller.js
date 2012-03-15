var Pivotal = require('pivotal');

var actions = {

  index: function( req, res ){
    if(req.session.token){
      res.redirect('/projects');
    }else{
      res.render('index',{
        title: 'Plan some stuff'
      });
    }
  }
, create: function(req, res){
    if(req.body.username){
    Pivotal.getToken(req.body.username, req.body.password, function(err, token){
      req.session.token = token.guid;
      res.redirect('/projects');
    });
    }else{
      req.session.token = req.body.key;
      res.redirect('/projects');
    }
  }
}
module.exports = actions;
