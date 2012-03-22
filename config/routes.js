module.exports = {
  routes: function(conf){
    index = require(conf.paths.controllers + '/index_controller.js');
    indexResource = app.resource(index);
    indexResource.map('get', '/logout', index.logout)

    projects = require(conf.paths.controllers + '/projects_controller.js')
    Projects = app.resource("projects",projects);
  }
};
