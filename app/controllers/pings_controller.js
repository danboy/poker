var actions = {

  index: function( req, res ){
    res.render('pings/index',{
      title: 'ping'
    });

    app.sjs.on('open', function(conn) {
      conn.on('message', function(e) {
        conn.send(e.data);
      });
    });
  },

  show: function( req, res ){
    res.render('pings/show',{
      title: 'ping show'
    });
  }

};

module.exports = actions;
