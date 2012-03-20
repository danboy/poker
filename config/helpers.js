var Helpers = {
  formatDate: function(date){
    d = new Date(date);
    Days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
    Month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    d.month = d.getMonth();
    d.Month = Month[d.month];
    d.day = d.getDay();
    d.Day = Days[d.day];
    d.date = d.getDate();
    return d;
  }
, replaceUrl: function(url){
    return url.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi, function($0) { 
       if ($0.length > 20 ) return "<a href='" + $0 + "' target='_blank'>"+$0.substring(7,30)+"</a>" 
       else return "<a href='" + $0 + "' target='_blank'>" + $0 + "</a>"
    });
  }
};

module.exports = Helpers;
