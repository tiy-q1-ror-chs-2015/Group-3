// 'use strict';

var Router = Backbone.Router.extend({
  routes: {
    '': 'search',
    'query/:query': 'search',
    'query/:query/start/:start': 'search'
  },

  search: function(query, start) {
    app.searchResult.clear();

    if(query !== undefined) {
      app.searchResult.set('query', query);
      app.searchQuery.set('query', query);
    }

    if(start!== undefined) {
      app.searchResult.set('start', start);
    }

    app.searchResult.fetch();
}
});

//
//
//   intitialize: function() {
//     console.log('routes have started');
//   },
//
//   routes:{
//     'search': 'searchRoute',
//   },
//
//   searchRoute: function(){
//     var self = this;
//     var search = new SearchResults();
//     search.fetch({data: $param({limit: 3})}).then(function(){
//       self.loadView(new SearchView({collection: search}));
//     });
//   }
//
//
// });
