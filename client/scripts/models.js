//recipe models
var RecipeModel = Backbone.Model.extend ({
  urlRoot: 'http://tiy-fee-rest.herokuapp.com/collections/lindsayeisbergrecipes2',
  idAttributes: '_id',
  defaults: function (){
    return {
      image: "no image available",
      recipeName: 'not available'
    };
  },
  initialize: function() {
    console.log('model created');
  },

});
