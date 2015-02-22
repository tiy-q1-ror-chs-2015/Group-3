//recipe models
var RecipeModel = Backbone.Model.extend ({
  urlRoot: 'http://localhost:9000/recipes',
  idAttributes: '_id',
  defaults: function (){
    return {
      image: "no image available",
      recipeName: 'not available',
      totalTime: 'n/a'
    };
  },
  initialize: function() {
    console.log('model created');
  },

});


var SearchQuery = Backbone.Model.extend ({
  defaults: {
    query: null
  }

});
// 'use strict';
var SearchResult = Backbone.Model.extend({
  defaults: {
  query: null,
  start: null
},

url: function() {
  var url;
  var params;

  params = {
    search: app.config.search
  };

  if(this.has('query')) {
    params.q = this.get('query');
  }

  if(this.has('start')) {
    params.start = this.get('start');
  }

  url = 'http://localhost:9000/recipes/search/search?limit=10';
  url += '?' + jQuery.param(params);
  return url;
},

fetch: function(options) {
  if (this.has('query')) {
    return Backbone.Model.prototype.fetch.call(this, options);
  }

  return;
}
});
