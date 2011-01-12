$(function(){
window.Message = Backbone.Model.extend({
  clear: function() {
    this.destroy();
    this.view.remove();
  }
});
window.MessageList = Backbone.Collection.extend({ 
  model: Message, 
  url: '/messages' 
});
window.Messages = new MessageList;
window.MessageRow = Backbone.View.extend({
  tagName: "li",

  className: "row",

  template: _.template($('#message-template').html()),

  events: {
    "click span.message-destroy"   : "clear"
  },

  initialize: function() {
    _.bindAll(this, "render");
    this.model.bind('change', this.render);
    this.model.view = this;
  },

  render: function() {
    console.log('render');
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  clear: function() {
    this.model.clear();
  }


});
window.AppView = Backbone.View.extend({
  el: $("body"),
  initialize: function() {
    _.bindAll(this, 'addOne', 'addAll', 'render');
    Messages.bind('add',     this.addOne);
    Messages.bind('refresh', this.addAll);
    Messages.bind('all',     this.render);

    Messages.fetch();

  },

render: function() {},
  addOne: function(message) {
  var view = new MessageRow({model: message, id: "message-row-" + message.id});
    this.$('#messages').append(view.render().el);
  },
  addAll: function() {
    Messages.each(this.addOne);
  },
  empty: function() {
    this.$('#messages').empty();
  }
}); 
window.App = new AppView;

});


