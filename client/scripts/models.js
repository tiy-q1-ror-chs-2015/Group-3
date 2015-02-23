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


var RandomSearch = Backbone.Model.extend({
  urlRoot: 'http://localhost:9000/recipes/random?limit=3',
  idAttributes: '_id',
  defaults: function () {
    return {
      image: 'no image available',
      recipeName: 'not available',
      totalTime: 'not available'
    };
  },
    initialize: function() {
      console.log('random search model created');
  },
});
