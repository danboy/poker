var Stat = function(data){
  this.getStories(data);
}
Stat.prototype = {
  getStories: function(iterations){
    stories = [];
    iterations.forEach(function(iteration){
      stories = stories.concat(iteration.stories.story)
    });
    this.sortByType('pie', stories);
    this.sortByType('current', iterations[0].stories.story);
  }
, sortByType: function(container, stories){
  var type = {feature: 0, chore: 0, release:0, bug: 0}
  stories.forEach(function(story){
    type[story.story_type] ++
  });
  var perc = function(num){
    return (num*100)/stories.length
  }
  this.drawPie(container, [{ label: 'feature', value: perc(type.feature) }, { label: 'chore', value: perc(type.chore)}, {label: 'release', value: perc(type.release)}, { label: 'bug', value: perc(type.bug)}]);
 }
, drawPie: function(container, data){
    var vals = []
    var legend = []
    data.forEach(function(val){
      vals.push(val.value);
      legend.push(Math.round(val.value)+'% '+val.label);
    });
    var r = Raphael(container, 350, 600); 
    r.piechart(190, 160, 150, vals, {legend: legend, legendpos: 'south', init: true})
  }
};
