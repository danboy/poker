/*
  TODO: This is quick and dirty, should obviously refactor the hell out of this
*/

var match = function(url,handler,method){
  handler = handler || "site#index";
  
  var parts = handler.split(/\#/),
      controller = parts.shift(),
      action = parts.shift(),
      sys = require('sys'),
      method = method || "get";

  //add the handler for the url
  if(url && action_handler){
    app[method](url,action_handler);
  }
};

module.exports.draw = function(app){
  match("/");
};

