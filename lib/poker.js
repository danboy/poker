module.exports = {
  getAverage: function(arr){
    var arr = arr.map( function( num ){ return parseInt( num, 10 ) } );
    return _.reduce(arr, function(memo, num){
      if (parseInt(num) != 'NaN'){
        return memo + num;
      }
    }, 0) / arr.length;
  },
  init: function(c){
    var self = this;
    var Redis = c.Redis
      , app = c.app;

    redis = Redis.createClient();

    function replacer(key, value) {
      if (typeof value === 'number' && !isFinite(value)) {
        return String(value);
      }
      return value;
    }
    var server = app.sjs.createServer();
    server.on('open', function(conn) {
      conn.on('message', function(e) {
        if(e.data.finished == true){
          redis.lrange(e.data.id,0,99,function(err, obj){
            self.getEstimate(obj,function(e){
              //var stringy = JSON.stringify({type: 'estimate', results: e});
              var stringy = {type: 'estimate', results: e};
              conn.send(JSON.stringify(stringy,replacer));
            });
          });
        }else{
          redis.lpush(e.data.id, e.data.estimate);
          redis.expire(e.data.id,60);
          redis.lrange(e.data.id,0,99,function(err, obj){
            conn.send(obj);
          });
        }
      });
    });
    server.installHandlers(app, {prefix:'[/]poker'});
  },
  getEstimate: function(array,callback){
    var array = array.map( function( num ){ return parseInt( num, 10 ) } );
    var r = new Array();
    points = [1,2,4,8];
    for(i in points){
      var l = _.without(array,points[i]).length;
      var a = array.length;
      r[points[i]] = a-l;
    }
    callback(r);
  }
}
