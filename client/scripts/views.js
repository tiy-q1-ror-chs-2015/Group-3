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


var RandomView = Backbone.View.extend ({
  template: _.template(templates.random),
  tagName: 'article',
  className: 'results',
  initialize: function() {
    console.log(this.el);
  },
  render: function() {
    console.log('rendering result');
    var markup = this.template(this.model.toJSON());
    this.$el.html(markup);
    return this;
  }
});

var RandomCollectionView = Backbone.View.extend({
  el:$('.randomOptions'),
  initialize: function() {
    console.log('random collection is initialized');
    $('#surprise').on('click', function(e){
      e.preventDefault();
      console.log('surprise button clicked!');
      var randomViewCollection = new RandomCollectionView();
      randomViewCollection.addRandom();

    });

  },


  addRandom: function() {
    console.log('random recipes added');
    $('.home').hide();
    $('.randomPage').addClass('show');
    this.addAllRandom();
},

addOneRandomSearch: function(random) {
  var randomView = new RandomView({model: random});
  $('.randomOptions').append(randomView.render().el);

},

addAllRandom: function() {
  _.each(this.collection.models, this.addOneRandomSearch, this);
}
});
