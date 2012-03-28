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
    this.sock.send({instruction: message,slide: this.slide, project: this.projectId});
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
        if(self.slide >0)
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
    $(document).keyup(function(e){
      switch(e.keyCode){
      case 27:
        self.message('stop');
        break;
      case 38:
        self.slide++;
        self.message('next');
        break;
      case 40:
        console.log(self.slide);
        if(self.slide > 0)
          self.slide--;
        self.message('previous');
        break;
      case 39:
        self.slide++;
        self.message('next');
        break;
      case 37:
        if(self.slide > 0)
          self.slide--;
        self.message('previous');
        break;
      default:
        console.log(e.keyCode);
        break;
      };
    });
  }
}
