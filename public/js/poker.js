var Game = Game || {};
Game = function(id, sock, points, user){
  this.points = points;
  this.user = user;
  this.sock = sock;
  this.sock = sock;
  this.id = id;
  this.createBoard();
}

Game.prototype = {
  createBoard: function(){
    var templates = {cards: Board.cards}
    var board = Mustache.to_html(Board.template,{
        'id': this.id
      , 'class': 'modal'
      , 'title': ''
      , 'description': ''
      , 'points': this.points
    },templates);
    $('#modals').append(board).show();
    this.setListeners();
  },
  setListeners: function(){
    self = this;
    var game = $('#'+this.id);
    game.find('ol li').click(function(ev){
      ev.preventDefault();
      self.sock.send({'instruction': 'estimate', story: self.id, estimate: $(this).find('a').data('estimate'), user: self.user});
      game.find('ol').remove();
      clock = new Countdown(5,function(count){
        $('.game_board .countdown').html(count).show();
      });
      setTimeout(function(){
        self.sock.send( { instruction: 'results' , story: self.id });
        clock.count = -1;
      },5000);
    });
    game.find('.close').click(function(){
      game.remove();
    });
    game.find('.button').click(function(){
      self.sock.send( { finished: true, id: self.id });
    });
    console.log('listen up',this.id);
  }
};

var Board = {
    template:  "<div id=\"{{id}}\" class=\"game_board modal\"><a class=\"close button\">close</a><h1>{{title}}</h1><div class=\"countdown\"></div>{{>cards}}</div>"
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
