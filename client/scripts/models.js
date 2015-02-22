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
