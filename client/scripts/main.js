var searchYum = {
  init: function() {
    searchYum.initEvent();
    searchYum.initStyling();
  },

  initStyling: function() {
    console.log('initStyling');
  },

  initEvent: function() {
    console.log('initEvent');
    $('#recipeSearch').on('click', function (event){
      console.log('button fired');
      event.preventDefault();
      searchYum.getSearch();
    });
  },


  config: {
    baseURL:'http://localhost:9000/recipes',
    search: $('.ingredients').find('input[name="searchRecipes"]').val()
  },

  getSearch: function() {
    $.ajax({
      url: searchYum.config.baseURL + '/search?limit=10' + searchYum.config.search,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        console.log(searchYum.config.url);
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

      error: function (error) {
        console.log(error);
      }
    });
  }
};

$(document).ready(function(){

  var recipeCollection = new RecipeCollection();
  recipeCollection.fetch().then(function () {
    var recipeCollectionView = new RecipeCollectionView({collection: recipeCollection});
  });
  searchYum.init();
});



// // 'use strict';
// var app = (function () {
//   var _config;
//   var _initialize;
//
//   _config = {
//     search: $('#search').find('input[name="query"]').val()
//   };
//
//   _initialize = function () {
//     app.searchQuery = new SearchQuery();
//     app.searchResult = new SearchResult();
//
//     app.searchQueryView = new SearchQueryView({model: app.searchQuery});
//     app.searchResultView = new SearchResultView({model: app.searchResult});
//
//     app.router = new Router();
//     Backbone.history.start();
//
//     app.searchQueryView.render();
//     app.searchResultView.render();
//   };
//
//   return {
//     config: _config,
//     init: _initialize
//   };
// }());
//
// $(document).ready(app.init);







  //activate search feature
  // var recipeSearch = new SearchResults();
  // recipeSearch.fetch().then(function (){
  //   var searchView = new SearchView({collection: recipeSearch});
  // });
  // searchYum.init();

//   route.router = new RecipeRoute();
//   Backbone.history.start();
// });
