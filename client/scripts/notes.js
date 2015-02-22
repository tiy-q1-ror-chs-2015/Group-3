
var searchYum = {
  init: function(){
    searchYum.initEvent();
    searchYum.initStyling();
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
}
