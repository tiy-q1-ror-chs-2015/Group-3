//recipe routes
//to get to each 'page' in the routes we will want to add the click event on the button
//set route from search to recipe model.  Do a fetch

//event on a view to search

// var SearchRouter= Backbone.router.extend({
//   intitialize: function() {
//     console.log('route has been created');
//   },
//
//   routes: {
//     '': 'home',
//     'test': 'testRoute'
//   },
//
// home: function(options){
//   console.log(options);
//   var self = this;
//   var search = new RecipeCollection();
//   var option = options.split('=')[1];
//   search.then(function() {
//  self.loadView(new RecipeCollectionView({collection: search}));
// },
//
//  testRoute: function() {
//   this.loadView(new testView());
//   this.view.render();
//
// }
//
//  });

var RecipeRoute = Backbone.Router.extend({
  intitialize: function() {
    console.log('routes have started');
  },

  routes:{
    'search': 'searchRoute',
  },

  searchRoute: function(){
    var self = this;
    var search = new SearchResults();
    search.fetch({data: $param({limit: 3})}).then(function(){
      self.loadView(new SearchView({collection: search}));
    });
  }


});
