//recipe collection

var RecipeCollection = Backbone.Collection.extend({
  url: 'http:localhost:9000/recipes/',
  model: RecipeModel
});
