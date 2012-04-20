var Estimate = Estimate || {};
Estimate = function(id, sock, points, user){
  this.points = points;
  this.user = user;
  this.sock = sock;
  this.sock = sock;
  this.id = id;
  this.createBoard();
}

Estimate.prototype = {
  createBoard: function(){
    var templates = {cards: Board.cards}
    var board = Mustache.to_html(Board.template,{
        'id': this.id
      , 'class': 'modal'
      , 'points': this.points
    },templates);
    $('#modals').append(board).show();
    this.setListeners();
  }
}
var Board = {
    template:  "<div id=\"estimates\" data-storyid=\"{{id}}\" class=\"game_board modal\"><a class=\"close button\">close</a><div class=\"countdown\"></div>{{>cards}}</div>"
  , cards:     "<ol>{{#points}}<li><a data-estimate=\"{{.}}\">{{.}}</a></li>{{/points}}</ol>"
}

var Countdown = function(duration,callback){
  this.count = duration;
  this.callback = callback;
  this.start();
};

Countdown.prototype = {
  start: function(){
    var self = this;
    setTimeout(function(){
      self.decrement(this.count);
    },1000);
  },
  decrement: function(){
    var self = this;
    this.count--
    if(this.count >=0 ){
      setTimeout(function(){self.increment();},1000);
    }else{
      this.callback();
    }
  }
};
