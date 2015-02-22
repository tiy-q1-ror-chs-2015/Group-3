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
