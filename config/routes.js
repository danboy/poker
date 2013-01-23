module.exports = {
  routes: function(conf){
    index = require(conf.paths.controllers + '/index_controller.js');
    indexResource = app.resource(index);
    indexResource.map('get', '/logout', index.logout)

    projects = require(conf.paths.controllers + '/projects_controller.js')
    Projects = app.resource("projects",projects);
    indexResource.map('get', '/stats/:project', projects.stats)

    cards = require(conf.paths.controllers + '/cards_controller.js')
    Cards = app.resource("cards", cards);
    indexResource.map('get', '/cards/print/:tracker/:story/:token', cards.print)

    pdfs = require(conf.paths.controllers+ '/pdf_controller.js')
    PDF = app.resource("pdf", pdfs);
    indexResource.map('get', '/pdf/print/:tracker/:story', pdfs.print)
  }
};
