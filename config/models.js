module.exports = {
  
  config: function(c){
    app.db.connect('mongodb://localhost/trckr');
    var Schema = app.db.Schema
    this.loadSchemas(Schema);
    return Schema;
  },
  loadSchemas: function(Schema){
    _.each(this.schemas,function(model){
      global[model.name] =  new Schema(model.schema);
    });
  },
  schemas: [
    { name: 'User', 
      schema: {
          login     : { type: String, required: true, unique: true}
        , password    : String
        , name        : String
        , uid         : String
        , token       : String
        , attribution : String
        , date        : Date
        , meta        : {
            votes  : Number
          , favs   : Number
        }
      }
    },
    { name: 'Tracker', 
      schema: {
          uid         : { type: String, required: true}
        , project     : String
        , name        : String
        , date        : Date
      }
    }
  ],
  userSchema: {
  }

}
