
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

//Search Query View
// 'use strict';
var SearchQueryView = Backbone.View.extend({
    tagName: 'div',
    el: '#search',

    events: {
      'submit form': 'submit'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      var template = _.template(templates.search);
      this.$el.html(this.template(this.model.attributes));
    },

    submit: function (e) {
        var query;

        e.preventDefault();

        query = this.$el.find('#query').val();
        if (query) {
            document.location = '#query/' + query;
        } else {
            document.location = '#';
        }
    }
});

//search result view
'use strict';
var SearchResultView = Backbone.View.extend({
   tagName: 'div',
   className: 'options',
   initialize: function () {
     this.listenTo(this.model, 'change', this.render);
   },
   render: function () {
     console.log(this);
     var template = _.template(templates.searchResults);
     this.$el.html(this.template(this.model.attributes));
   }
});

//
// var SearchQuery = Backbone.Model.extend ({
//   defaults: {
//     query: null
//   }
//
// });
// // 'use strict';
// var SearchResult = Backbone.Model.extend({
//   defaults: {
//   query: null,
//   start: null
// },
//
// url: function() {
//   var url;
//   var params;
//
//   params = {
//     search: app.config.search
//   };
//
//   if(this.has('query')) {
//     params.q = this.get('query');
//   }
//
//   if(this.has('start')) {
//     params.start = this.get('start');
//   }
//
//   url = 'http://localhost:9000/recipes/search/search?limit=10';
//   url += '?' + jQuery.param(params);
//   return url;
// },
//
// fetch: function(options) {
//   if (this.has('query')) {
//     return Backbone.Model.prototype.fetch.call(this, options);
//   }
//
//   return;
// }
// });
