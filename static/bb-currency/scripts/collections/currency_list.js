// example of a view loaded by requirejs
define(
  //requirements
  ['../shovel', '../models/currency'],

  function(shovel){

    // declare the collections attributes here
    var clist = Backbone.Collection.extend({ 
      url: '/currencies',
      model: shovel.models.currency
    });



    shovel.collections = (function(collections) {
      collections.currency_list = new clist;
      return collections;
    }(shovel.collections || {}));
    return shovel;
  }
);
