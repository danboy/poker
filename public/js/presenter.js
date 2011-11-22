Presentation = function(list,sock){
  this.list = $(list);
  this.slide = 0;
  this.init();
}

Presentation.prototype = {
  init: function(){
    self = this;
    this.list.each(function(index,item){
      var link = $('<a/>',{'text': '[]', name: 'slide'+index, href: '#slide'+index, 'class': 'start'}).click(function(){
        self.show(index);
        link.click();
      });
      $(item).append(link);
    });
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
  setKeys: function(){
    self = this;
    $(document).keypress(function(e){
      switch(e.keyCode){
      case 106:
        self.next();
        break;
      case 107:
        self.previous();
        break;
      case 113:
        self.stop();
        break;
      default:
        break;
      };
    });
  }
}
