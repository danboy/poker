var crypto = global.crypto;
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
        .consumerKey('PZZ0pLTj08wZIkUu0R0ag')
        .consumerSecret('LL69kxoTtREhIaMmTAIYMYgGcNVooVYQqEYhhwC7RoA')
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

        everyauth.everymodule.findUserById( function (userId, callback) {
            var User = app.db.model('User');
            User.findOne({_id: userId}, function(err,foundUser){
              callback(err,foundUser);
            });
        });
  }

}
