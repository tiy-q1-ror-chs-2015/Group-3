//recipe models
var RecipeModel = Backbone.Model.extend ({
  urlRoot: 'http://localhost:9000/recipes',
  idAttributes: '_id',
  defaults: function (){
    return {
      image: "no image available",
      recipeName: 'not available',
      totalTime: 'n/a'
    };
  },
  initialize: function() {
    console.log('model created');
  },

});

//
//
// var CreateRecipeModel = Backbone.Model.extend ({
//   urlRoot: 'http://localhost:9000/recipes/create',
//   idAttributes: '_id',
//   defaults: function (){
//     return {
//       image: "no image available",
//       recipeName: 'not available',
//       totalTime: 'n/a'
//     };
//   },
//   initialize: function() {
//     console.log('new recipe created');
//   },
//
// });

var SearchModel = Backbone.Model.extend({
  urlRoot: 'http://localhost:9000/recipes/search?limit=10',
  initialize: function() {
    this.results = new SearchResults( this.get('results'));
    this.trigger('search:ready', this);
  }
});
