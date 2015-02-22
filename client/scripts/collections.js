//recipe collection

var RecipeCollection = Backbone.Collection.extend({
  url: 'http://localhost:9000/recipes',
  model: RecipeModel
});


// var NewRecipeCollection = Backbone.Collection.extend({
//   url: 'http://localhost:9000/recipes/create',
//   model: CreateRecipeModel
// });
//
var SearchResults = Backbone.Collection.extend({
  url: 'http://localhost:9000/recipes/search?limit=10',
  model: SearchModel
});
