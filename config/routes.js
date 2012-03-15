module.exports = {
  routes: function(conf){
    trackers = require(conf.paths.controllers + '/trackers_controller.js');
    projects = require(conf.paths.controllers + '/projects_controller.js')
    app.resource(require(conf.paths.controllers + '/index_controller.js'));
    Projects = app.resource("projects",projects);


    app.resource("ping", require( conf.paths.controllers + '/pings_controller.js' ));

    app.resource("users", require( conf.paths.controllers + '/users_controller.js' ))

    trackerResources = app.resource("trackers", trackers);
    trackerResources.map('post', '/get_token', trackers.getToken);
    Projects.map('post', '/start_game', projects.startGame);
    trackerResources.map('post', '/get_iteration', trackers.getIteration);

  }
};
