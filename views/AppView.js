define([
  "underscore",
  "backbone",
  "../models/TodoModel.js",
  "../views/TodoFormView.js",
  "../views/TodoItemView.js",
  "../collections/TodoCollection.js",
], function (
  _,
  Backbone,
  TodoModel,
  TodoFormView,
  TodoItemView,
  TodoCollection
) {
  var TodoView = Backbone.View.extend({
    el: "#formmodel",

    initialize: function () {
      this.collection = new TodoCollection();
      this.todoFormView = new TodoFormView();
      this.todoItemView = new TodoItemView();

      this.listenTo(this.model, "destroy", this.remove);
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.collection, "sync", function () {
        this.render();
      });

      this.collection.fetch();
    },

    render: function () {
      this.model = new TodoModel();

      this.$el.prepend(this.todoFormView.render().el);

      if (this.collection.length === 0) {
        this.$el.append("<p>no todos to display</p>");
      } else {
        this.$("#todo-list").empty();
        this.collection.each(function (todo) {
          var todoItemView = new TodoItemView({ model: todo });
          this.$("#todo-list").append(todoItemView.render().el);
        });
      }

      return this;
    },
  });

  return TodoView;
});
