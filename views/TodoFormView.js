define([
  "underscore",
  "backbone",
  "text!templates/todoForm.html",
  "../models/TodoModel.js",
], function (_, Backbone, todoFormTemplate, TodoModel) {
  var TodoFormView = Backbone.View.extend({
    tagName: "form",
    template: _.template(todoFormTemplate),

    events: {
      "click #btnSaveOne": "saveTodo",
      "click #btnCancel": "resetForm",
    },

    initialize: function () {
      this.model = new TodoModel();
    },

    saveTodo: function (e) {
      e.preventDefault();

      var taskName = this.$("#task").val();
      var taskDescription = this.$("#description").val();

      var todo = new TodoModel({
        task: taskName,
        description: taskDescription,
        isDone: false,
      });

      todo.save();

      this.resetForm();
    },

    resetForm: function () {
      if (!this.model.isValid()) {
        return;
      }
      this.$("#task").val("");
      this.$("#description").val("");

      this.model.clear();
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    },
  });

  return TodoFormView;
});
