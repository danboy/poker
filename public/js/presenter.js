Presentation = function(list, projectId, slide){
  this.list = $(list);
  this.projectId = projectId;
  this.slide = slide || 0;
  this.init();
  this.sock = new SockJS(window.location.origin + '/ipm/'+projectId);
}

Presentation.prototype = {
  init: function(){
    self = this;
    this.setKeys();
  },
  start: function(){
    this.show(this.slide);
  },
  stop: function(){
    this.list.removeClass('current');
  },
  show: function(slide){
    this.slide = slide;
    this.list.removeClass('current');
    $(this.list[this.slide]).addClass('current');
  },
  next: function(){
    this.slide++;
    this.show(this.slide);
  },
  previous: function(){
    this.slide--;
    this.show(this.slide);
  },
  message: function(message,slide){
    var self = this;
    console.log(self);
    this.sock.send({instruction: 'start',slide: this.slide, project: this.projectId});
  },
  setKeys: function(){
    var self = this;
    $(document).keypress(function(e){
      switch(e.keyCode){
      case 106:
        self.slide++;
        self.message('next');
        break;
      case 107:
        self.slide--;
        self.message('previous');
        break;
      case 113:
        self.message('stop');
        break;
      default:
        break;
      };
    });
  }
}
