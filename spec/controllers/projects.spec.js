var Projects = require('../../app/controllers/projects_controller.js');
describe('Projects',function(){
  it('retrieves a list of projects',function(){
    expect(Projects.index().projects.length).toBeGreaterThan(0);
  });
});
