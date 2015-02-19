//recipe collection

var recipeCollection = Backbone.Collection.extend({
  url: 'http:localhost:9000/recipes/',
  model: recipeModel
});
