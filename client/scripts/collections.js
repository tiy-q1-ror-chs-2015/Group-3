//recipe collection

var RecipeCollection = Backbone.Collection.extend({
  url: 'http://localhost:9000/recipes',
  model: RecipeModel
});


// var SearchCollection = Backbone.Collection.extend({
//   url: 'http://localhost:9000/recipes/search/search?limit=10',
//   model: SearchResult
//
// });

var RandomCollection = Backbone.Collection.extend({
  url: 'http://localhost:9000/recipes/random?limit=3',
  model: RandomSearch
});
