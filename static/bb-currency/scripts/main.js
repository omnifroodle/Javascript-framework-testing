require(["jquery", "collections/currency_list", "views/message"], function($, shovel) {
  $(function() {
    window.shovel = shovel;
    window.MessageWidget = new shovel.views.message_box;
  });
});
