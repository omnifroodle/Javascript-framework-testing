// example of a view loaded by requirejs
define(
  //requirements
  ['../shovel', '../models/message'],

  function(shovel){

    // declare the collections attributes here
    var clist = Backbone.Collection.extend({ 
      url: '/messages',
      model: shovel.models.message
    });



    shovel.collections = (function(collections) {
      collections.messages = new clist;
      return collections;
    }(shovel.collections || {}));
    return shovel;
  }
);
