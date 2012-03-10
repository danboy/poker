var User = app.db.model('User', global.User),
    crypto = global.crypto;
    
var actions = {

  index: function( req, res ){
    User.find({},function(err,users){
      res.render('users/index',{
          title: 'Users'
        , users: users
        , total: users.length
      });
    });
  },

  new: function( req, res ){
    res.render('users/new',{
      title: "New User"
    });
  },

  create: function( req, res){
    if(req.body.user){
      user = new User(req.body.user);
      user.password = crypto.createHash('md5').update(user.password).digest("hex");
      user.save(function(err){
        if(!err){
          res.redirect('/login');
        }else{
          res.redirect('users/new');
        }
      });
    }else{
      res.render('users/new',{
        title: "New User"
        , error: err
        , user: user
      });
    }

  },

  show: function( req, res ){
    User.findOne( { 'login': req.params.user} , function(err,user){
      if(!err){
        res.render('users/show',{
            title: 'Users'
          , login: user.login
          , name: user.name
          , id: user.id
        });
      }
    });
  },

  //Edit

  edit: function( req, res ){
    User.findOne( { 'login': req.params.user} , function(err,user){
      if(!err){
        res.render('users/edit',{
            title: 'Users'
          , login: user.login
          , name: user.name
          , id: user.id
        });
      }
    });
  },

  //Update
  update: function( req, res ){
    if(req.body.user.tracker_id){
      User.update( { 'login': req.body.user.login} 
      , {$set: { token: req.body.user.tracker_id}}
      , {upsert: true}
      , function(err,user){
        if(!err){
          res.redirect('users/'+req.body.user.login);
        }
      });
      
    }else{
      User.update( { 'login': req.body.user.login} 
      , {$set: { name: req.body.user.name,
          password: crypto.createHash('md5').update(req.body.user.password).digest("hex") }}
      , {upsert: true}
      , function(err,user){
        if(!err){
          res.redirect('users/'+req.body.user.login);
        }
      });
    }
  },

  //Destroy
  destroy: function( req, res ){
    User.remove( {login: req.params.user}, function(err,user){
      res.redirect('/users');
    });
  }

};

module.exports = actions;
