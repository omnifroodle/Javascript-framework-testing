// Globals....aaaaargh
define(

  ['../models/currency'],

  function() {
    window.CurrencyList = Backbone.Collection.extend({ 
      model: Currency, 
      url: '/currencies'
    });
    window.currencies = new CurrencyList;
  }
);
