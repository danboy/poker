var crypto = global.crypto
  , conf = require('../config/auth');
module.exports = {

  auth: function(a){
    var everyauth = a.everyauth
      , app       = a.app;

    this.modules(everyauth, app);
    everyauth.helpExpress(app);
  },
  modules: function(everyauth){
    everyauth
      .password
        .loginWith('login')
        .getLoginPath('/login')
        .postLoginPath('/login')
        .loginView('session/login.jade')
        .loginLocals( function (req, res, done) {
          setTimeout( function () {
            done(null, {
              title: 'Async login'
            });
          }, 200);
        })
        .authenticate( function (login, password) {
          var errors = [];
          if (!login) errors.push('Missing login');
          if (!password) errors.push('Missing password');
          if (errors.length) return errors
          var promise = new everyauth.Promise();
          var User = app.db.model('User');
          
          User.findOne({'login': login}, function (err, foundUser){
            if(err) return promise.fulfill(err);
            if(!foundUser) return promise.fulfill(['Login failed']);
            password = crypto.createHash('md5').update(password).digest("hex");
            if (foundUser.password !== password ) return promise.fulfill(['Login failed']);
            return promise.fulfill(foundUser);
          });

          return promise;
        })
        .getRegisterPath('/users/new')
        .postRegisterPath('/')
        .registerView('users/new.jade')
        .registerLocals( function (req, res, done) {
          setTimeout( function () {
            done(null, {
              title: 'Async Register'
            });
          }, 200);
        })
        .validateRegistration( function (newUserAttrs, errors) {
          var login = newUserAttrs.login;
          if (usersByLogin[login]) errors.push('Login already taken');
          return errors;
        })
        .registerUser( function (newUserAttrs) {
          var login = newUserAttrs[this.loginKey()];
          return usersByLogin[login] = addUser(newUserAttrs);
        })
        .loginSuccessRedirect('/')
        .registerSuccessRedirect('/');

    everyauth
      .twitter
        .consumerKey(conf.twitter.consumerKey)
        .consumerSecret(conf.twitter.consumerSecret)
        .findOrCreateUser(function(session,accessToken,accessSecret,twitterUser){
          var promise = new everyauth.Promise();
          var User = app.db.model('User');
          User.findOne({uid: twitterUser.id}, function (err, foundUser){
            if(err) return promise.fail(err);
            if(foundUser) return promise.fulfill(foundUser);
            var user = new User({
                uid:          twitterUser.id
              , name:         twitterUser.name
              , login:        twitterUser.screen_name
              , attribution:  'twitter'
            });

            user.save();
            return promise.fulfill(user);
          });

          return promise;
        })
        .redirectPath('/');

    everyauth
      .google
        .appId(conf.google.appId)
        .appSecret(conf.google.appSecret)
        .scope('https://www.google.com/m8/feeds https://docs.google.com/feeds/ https://spreadsheets.google.com/feeds/') // What you want access to
        .handleAuthCallbackError( function (req, res) {
            res.render('users/new',{
              title: "New User"
            });
          })
        .findOrCreateUser( function (session, accessToken, accessTokenExtra, googleUser) {
          console.log(googleUser);
          var promise = new everyauth.Promise();
          var User = app.db.model('User');
          User.findOne({uid: googleUser.id, attribution: 'google'}, function (err, foundUser){
            if(err) return promise.fail(err);
            if(foundUser) return promise.fulfill(foundUser);
            var user = new User({
                uid:          googleUser.id
              , name:         googleUser.name
              , login:        googleUser.id.match(/^([^@]+)(@.*)$/)[1]
              , attribution:  'google'
            });

            user.save(function(err){
              if(!err){
                return promise.fulfill(user);
              }else{
                return promise.fail(err);
              }
            });
          });

          return promise;
          })
        .redirectPath('/')
        .callbackPath('/auth/google/callback');

    everyauth
      .everymodule
        .findUserById( function (userId, callback) {
            var User = app.db.model('User');
            User.findOne({_id: userId}, function(err,foundUser){
              callback(err,foundUser);
            });
        });
  }
}


