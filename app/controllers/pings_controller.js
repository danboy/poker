var actions = {

  index: function( req, res ){
    res.render('pings/index',{
      title: 'ping'
    });

  },

  show: function( req, res ){
    res.render('pings/show',{
      title: 'ping show'
    });
  }

};

module.exports = actions;
