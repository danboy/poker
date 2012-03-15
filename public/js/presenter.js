Presentation = function(list,sock,slide){
  this.list = $(list);
  this.projectId = sock;
  this.slide = slide || 0;
  this.init();
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
    $.ajax({
      url: '/projects/present'
    , data: {
        projectId: this.projectId
      , instruction: message
      , slide: self.slide
      }
    , type: 'POST'
    , error : function(xhr, ajaxOptions,err) {
        console.log(err);
      }
    , success: function(resp){
        console.log('data',resp.data);
      }
    });
  },
  setKeys: function(){
    var self = this;
    $(document).keypress(function(e){
      switch(e.keyCode){
      case 106:
        self.message('next');
        break;
      case 107:
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
