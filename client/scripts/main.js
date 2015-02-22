

$(document).ready(function(){

  var recipeCollection = new RecipeCollection();
  recipeCollection.fetch().then(function () {
    var recipeCollectionView = new RecipeCollectionView({collection: recipeCollection});
  });

  $('#recipeSearch').on('click', function(e){
    console.log('button fired');
    e.preventDefault();

    var find = $('#searchRecipes').val();

    var config = {
      baseURL:'http://localhost:9000/recipes',
      search: find
    };

    $.ajax({
      url: config.baseURL + '/search?q=' + config.search + '&limit=3',
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        console.log(config.search);
        data.recipes.forEach(function(item, index, array){
          console.log('iteration activated. ', item.name);
          $('.options').append(
            '<article class="results">' +
            '<img src=' + item.imageSrc + ' >' +
            '<h3>' + item.name + '</h3>' +
            '</article>'
          );
        });
      },
      error: function(error){
        console.log(error);
      }
    });
  });
});
