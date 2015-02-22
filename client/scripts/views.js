//recipe views

var RecipeView = Backbone.View.extend({
 template: _.template(templates.results),
 tagName: 'article',
 className: 'results',
 initialize: function () {
   console.log(this.el);
 },
 render: function() {
   console.log('rendering result');
   var markup = this.template(this.model.toJSON());
   this.$el.html(markup);
   return this;
}
});

//collection view
var RecipeCollectionView = Backbone.View.extend({
el:$('.addRecipe'),
initialize: function() {
  console.log('recipe collection is initialized');
  // this.addAllRecipes();
},
events: {
  "submit #newRecipe": "createRecipe"
},

createRecipe: function(event) {
  event.preventDefault();
  console.log("create recipe");
  var newRecipe = {
    recipeName: $('#newRecipe').find("input[name='recipeName']").val(),
    ingredients: $('#newRecipe').find("textarea[name='ingredients']").val(),
    instructions: $('#newRecipe').find("textarea[name='instructions']").val(),
    image: $('#newRecipe').find("input[name='photo']").val(),
    category: $('#newRecipe').find("input[name='category']").val(),
    searchIng: $('#newRecipe').find("checkbox[name='searchIng']").val()
  }; //end template values
  console.log("newRecipe", newRecipe);

  var newModelRecipe = new RecipeModel(newRecipe);
  newModelRecipe.save();
  console.log(this.collection.length);
  this.collection.add(newModelRecipe);
  console.log(this.collection.length);
  this.addOneRecipe(newModelRecipe);

  $('input').val('');
  $('textarea').val('');

},
addOneRecipe : function(recipe) {
  var recipeView = new RecipeView({model: recipe});
  this.$el.append(recipeView.render().el);
  alert("Recipe added!");
}
});//end appview


// // SEARCH VIEW
// var SearchView = Backbone.View.extend({
//   el: $('.options'),
//   initialize: function() {
//     this.render();
//     console.log('search function initialized');
//   },
//
//   events: {
//     'submit #searchRecipe': 'searchRecipe'
//   },
//   render: function() {
//     console.log('rendering result');
//  },
//
//  searchRecipe: function() {
//    event.preventDefault();
//    console.log('search activated');
//
//  }
//  });
//
//
//
//  var recipeView = new RecipeView({model: recipe});
//  this.$el.append(recipeView.render().el);



var SearchView = Backbone.View.extend({
  template: _.template(templates.results),
  tagName: 'article',
  className: 'results',
  initialize: function () {
    console.log(this.el);
  },
  events: function() {
    $('#recipeSearch').on('click', function (event){
          console.log('button fired');
          event.preventDefault();
          var searchView = new SearchView;
          searchView.createSearch();
        });
  },

  createSearch: function() {
    console.log('button triggered create search');
    var search = new SearchModel({
      field: this.$el.find('input[name="searchRecipes"]').val()
    });
    search.on("search:ready", this.renderResults, this)
    search.fetch();
  },
  renderResults: function(search) {
    // console.log('rendering result');
    // var markup = this.template(this.model.toJSON());
    // this.$el.html(markup);
    // return this({model: search});
    search.results();
  }
});
