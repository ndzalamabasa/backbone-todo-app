define([
  "underscore",
  "backbone",
  "text!templates/todoItem.html",
  "../models/TodoModel.js",
  "../collections/TodoCollection.js",
], function (_, Backbone, todoItemTemplate, TodoModel) {
  var TodoView = Backbone.View.extend({
    tagName: "li",
    className: "todo-item",
    template: _.template(todoItemTemplate),

    events: {
      "click #btnSaveOne": "saveTodo",
      "click #btnCancel": "resetForm",
      "click .delete-todo": "deleteTodo",
      "click .is-done": "completeTodo",
    },

    deleteTodo: function (e) {
      this.model.destroy();
    },

    completeTodo: function (e) {
      e.preventDefault();
      this.model.save(
        [
          {
            op: "replace",
            path: "/isDone",
            value: !this.model.get("isDone"),
          },
        ],
        {
          patch: true,
        }
      );
    },

    initialize: function () {
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.model, "destroy", this.remove);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
  });

  return TodoView;
});
