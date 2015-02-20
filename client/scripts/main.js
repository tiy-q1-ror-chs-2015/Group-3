//recipe genie main file
// var route = {};

var searchYum = {
  init: function(){
    page.initEvent();
    page.initStyling();
  },

  initStyling: function () {
    console.log('initStyling');
  },

  initEvent: function (){
    console.log('initEvent');

    $('.recipeSearch').on('click', function(event) {
      event.preventDefault();
      searchYum.getSearch();
    });
  },
    config: {
      baseURL:'http://localhost:9000/recipes',

       //token goes here

  },

getSearch: function () {
  $.ajax({
    url: searchYum.config.baseURL + '/search?limit=10' + $('#searchRecipes').val(),
    type:'GET',
    dataType: 'JSON',
    success: function(data) {
      console.log(data);
      var template = _.template(templates.results);
      recipes.data.forEach(function(item, index, array){
        $('.results').append(template);
      });
    },

    error: function (error) {
      console.log(error);

    }
  });
  }
};


$(document).ready(function() {
  searchYum.init();
  var recipeCollection = new RecipeCollection();
  recipeCollection.fetch().then(function () {
    var recipeCollectionView = new RecipeCollectionView({collection: recipeCollection});
  });
//   route.router = new RecipeRoute();
//   Backbone.history.start();
// });
