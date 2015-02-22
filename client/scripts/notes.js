
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
        $('.results').append(
          '<article>'
          '<img src="<%= item.imageSrc %>"/ >',
          '<h3><%= item.name %></h3>',
        );
      });
    },

    error: function (error) {
      console.log(error);

    }
  });
  }
}




//recipe views

var RecipeView = Backbone.View.extend({
 template: _.template(templates.results),
 tagName: 'article',
 className: 'results',
 config: {
   baseURL:'http://localhost:9000/recipes',
   search: $('.ingredients').find('input[name="searchRecipes"]').val()
 },
 initialize: function () {
   console.log(this.el);
 },

 events: {
   'submit .recipeSearch': 'render'
 },

 render: function() {
   console.log('rendering result');
   var newObj = this.model.toJSON;
   var that = this;
   var markup = that.template(newObj);

   $.ajax({
     url: this.view.config.baseURL + '/search?limit=10' + this.view.config.search,
     type: 'GET',
     dataType: 'JSON',
     success: function(data) {
       console.log(data);
       data.recipes.forEach(function(item, index, array){
         console.log('iteration activated. ', item.name);
         that.$el.html(markup);
         return that;
       });
     },

     error: function (error) {
       console.log(error);
     }
   });
  }
});




//recipe views

var RecipeView = Backbone.View.extend({
 template: _.template(templates.results),
 tagName: 'article',
 className: 'results',
 initialize: function () {
   console.log(this.el);
 },

 events: {
   "submit #recipeSearch": "getSearch"
 },

 config: {
   baseURL:'http://localhost:9000/recipes',
   search: $('.ingredients').find('input[name="searchRecipes"]').val()
 },
 render: function() {
   console.log('rendering result');
},

getSearch: function(event) {
  event.preventDefault();
  console.log('click event works');
  $.ajax({
    url: this.view.config.baseURL + '/search?limit=10' + this.view.config.search,
    type: 'GET',
    dataType: 'JSON',
    success: function(data) {
      console.log(data);
      var markup = this.template(this.model.toJSON());
      data.recipes.forEach(function(item, index, array){
      console.log('iteration activated. ', item.name);
      this.$el.html(markup);
      return this;
    });
    },

    error: function (error) {
    console.log(error);
    }
    });

  }


});




// var SearchView = Backbone.View.extend({
//   el:$('.options'),
//   initialize: function () {
//     console.log(this.el);
//   },
//   events: function() {
//     $('#recipeSearch').on('click', function (event){
//           console.log('button fired');
//           event.preventDefault();
//           var searchView = new SearchView;
//           searchView.createSearch();
//         });
//   },
//
//   createSearch: function() {
//     console.log('button triggered create search');
//     var search = new SearchModel({
//       field: this.$el.find('input[name="searchRecipes"]').val()
//     });
//     search.on("search:ready", this.renderResults, this)
//     this.renderResults();
//   },
//   renderResults: function(search) {
//     console.log('rendering result');
//     var recipeViewSearch = new RecipeView({model:search});
//
//     this.$el.append(recipeViewSearch.render().el);
//     console.log('search complete');
//   }
// });
