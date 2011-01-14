// example of a currency model loaded by requirejs
define(
  // require shovel
  ['../shovel'],


  function (shovel){
    shovel.models = (function (models) {
      
      
      
      models.message = Backbone.Model.extend({

        clear: function() {
          this.destroy();
          this.view.remove();
        }
      });


      return models;
    }(shovel.models || {}));

    return shovel;
  }
);
