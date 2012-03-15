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
};

module.exports = Helpers;
