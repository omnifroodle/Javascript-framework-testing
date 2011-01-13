// Globals....aaaaargh
define(

  function() {
    window.Currency = Backbone.Model.extend({
      clear: function() {
        this.destroy();
        this.view.remove();
      }
    });
  }
)
