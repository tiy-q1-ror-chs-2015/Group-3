//recipe genie main file
$(document).ready(function() {
  var recipeCollection = new RecipeCollection();
  recipeCollection.fetch().then(function () {
    var recipeCollectionView = new RecipeCollectionView({collection: recipeCollection});
  });
});
