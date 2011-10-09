everyauth = require('everyauth');
var actions = {};
actions.index = function( req, res ){
  res.render('index',{
      
      title: 'Welcome'
  });
};

module.exports = actions;
