Sockets = {
  switch: function(req, server){
    console.log('::::::::::::',req.instruction);
    switch(req.instruction){
    case 'present':
      console.log('present');
      app.redis.hgetall('ipm'+req.project, function(err, obj){
        server.emit('present',{'instruction': req.instruction, 'slide': req.slide});
        app.redis.hmset('ipm'+req.project, 'slide', req.slide);
      });
      break
    case 'estimate':
      console.log('estimate');
      server.emit('estimate',{'instruction': req.instruction, 'story': req.story});
      app.redis.lpush(req.story, req.estimate);
      app.redis.expire(req.story, 60);
      app.redis.lrange(req.story, 0, 99, function(err, obj){
        server.emit('present', obj);
      });
      break;
    case 'get estimates':
      app.redis.lrange(req.story, 0, 99, function(err, obj){
        if(!err)
          server.emit('present', {instruction: 'results', estimates: obj});
      });
      break;
    case 'launch estimate':
      server.emit('present',{'instruction': req.instruction, 'story': req.story});
      break;
    default:
      console.log('default');
      app.redis.hgetall('ipm'+req.project, function(err, obj){
        server.emit('present',{'instruction': req.instruction, 'slide': req.slide});
        app.redis.hmset('ipm'+req.project, 'slide', req.slide);
      });
      break;
    }
  }
, getEstimate: function(array, points, callback){
  var array = array.map( function( num ){ return parseInt( num, 10 ) } );
  var r = new Array();
  for(i in points){
  var l = _.without(array,points[i]).length;
  var a = array.length;
  r[points[i]] = a-l;
  }
  callback(r);
  }
}

module.exports = Sockets;
