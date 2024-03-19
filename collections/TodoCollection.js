define(["underscore", "backbone", "../models/TodoModel.js"], function (
  _,
  Backbone,
  TodoModel
) {
  var TodoCollection = Backbone.Collection.extend({
    url: "https://localhost:7177/api/Todos",
    model: TodoModel,
  });

  return TodoCollection;
});
