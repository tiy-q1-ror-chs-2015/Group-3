//recipe collection

var RecipeCollection = Backbone.Collection.extend({
  url: 'http://tiy-fee-rest.herokuapp.com/collections/lindsayeisbergrecipes2',
  model: RecipeModel
});
