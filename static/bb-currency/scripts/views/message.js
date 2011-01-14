// example of a currency model loaded by requirejs
define(
  // require shovel
  ['../shovel', 'text!views/message.html', '../collections/messages_list'],


  function (shovel, message_template){
    shovel.views = (function (views) {



      views.message = Backbone.View.extend({
        tagName: "li",

        className: "row",

        template: _.template(message_template),

        initialize: function() {
          _.bindAll(this, "render");
          this.model.bind('change', this.render);
          this.model.view = this;
        },
        render: function() {
          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        }
      });

      views.message_box = Backbone.View.extend({
        el: $("body"), // we should probably hold off on specifying this until we are about to add it
        initialize: function() {
          _.bindAll(this, 'addOne', 'addAll', 'render');
          shovel.collections.messages.bind('add',     this.addOne);
          shovel.collections.messages.bind('refresh', this.addAll);
          shovel.collections.messages.bind('all',     this.render);

          shovel.collections.messages.fetch();

        },

        render: function() {},
        addOne: function(message) {
          var view = new shovel.views.message({model: message, id: "message-row-" + message.id});
          this.$('#messages').append(view.render().el);
        },
        addAll: function() {
          shovel.collections.messages.each(this.addOne);
        },
        empty: function() {
          this.$('#messages').empty();
        }
      }); 

      return views;
    }(shovel.views || {}));

    return shovel;
  }
);
