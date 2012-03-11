module.exports = {
  routes: function(conf){
    trackers = require(conf.paths.controllers + '/trackers_controller.js');
    
    app.resource(require(conf.paths.controllers + '/index_controller.js'));


    app.resource("ping", require( conf.paths.controllers + '/pings_controller.js' ));

    app.resource("users", require( conf.paths.controllers + '/users_controller.js' ))

    trackerResources = app.resource("trackers", trackers);
    trackerResources.map('post', '/start_game', trackers.startGame);
    trackerResources.map('post', '/get_iteration', trackers.getIteration);

  }
};
