define(["underscore", "backbone"], function (_, Backbone) {
  var TodoModel = Backbone.Model.extend({
    urlRoot: "https://localhost:7177/api/todos",
    url: function () {
      if (this.isNew()) {
        return this.urlRoot;
      } else {
        return this.urlRoot + "/" + this.get(this.idAttribute);
      }
    },

    idAttribute: "id",

    defaults: {
      id: null,
      task: "",
      description: "",
      isDone: false,
    },

    validation: {},
  });

  return TodoModel;
});
