//recipe models
var recipeModel = Backbone.Model.extend ({
  urlRoot: 'http:localhost:9000/recipes/',
  idAttributes: '_id',
  defaults: function (){
    return {
      image: "no image available",
      recipeName: 'not available'
    };
  },
  initialize: function() {
    console.log('model created');
  }
});
