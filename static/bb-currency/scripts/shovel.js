define(
  ["order!/bb-currency/scripts/common/underscore.js", "order!/bb-currency/scripts/common/backbone.js"],

  function (){
    var shovel = (function (shovel) { 
      shovel.models = {};
      shovel.views = {};
      shovel.collections = {};
      return shovel;
    }(shovel || {}));
    return shovel;
  }
);
