var Game = Game || {};
Game = function(element,sock){
  this.sock = sock;
  this.item = $(element);
  this.sock = sock;
  this.id = this.item.data('story');
  this.el = $(this.item.parents('.story'));
  this.createBoard();
}

Game.prototype = {
  createBoard: function(){
    var templates = {cards: Board.cards}
    var board = Mustache.to_html(Board.template,{
        'id': this.id
      , 'title': this.el.contents('.title').text()
      , 'description': this.el.contents('.description').html()
      , 'points': this.points()
    },templates);
    $('body').append(board);
    this.setListeners();
  },
  points: function(){
    return [1,2,4,8];
  },
  setListeners: function(){
    self = this;
    var game = $('#'+this.id);
    game.find('ol li').click(function(ev){
      ev.preventDefault();
      self.sock.send({id: self.id, estimate: $(this).find('a').data('estimate')});
      game.find('ol').remove();
      clock = new Countdown(5,function(count){
        $('.game_board .countdown').html(count).show();
      });
      setTimeout(function(){
        self.sock.send( { finished: true, id: self.id });
        clock.count = -1;
      },5000);
    });
    game.find('.close').click(function(){
      game.remove();
    });
    game.find('.button').click(function(){
      self.sock.send( { finished: true, id: self.id });
    });
  }
};

var Board = {
    template:  "<div id=\"{{id}}\" class=\"game_board\"><a class=\"close button\">close</a><h1>{{title}}</h1><div class=\"countdown\"></div>{{>cards}}</div>"
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
      self.increment(this.count);
    },1000);
  },
  increment: function(){
    var self = this;
    this.count--
    if(this.count >=0 ){
      this.callback(this.count);
      setTimeout(function(){self.increment();},1000);
    }
  }
};
