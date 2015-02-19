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

var RecipeCollectionView = Backbone.View.extend({
  el:$('.container'),
  initialize: function() {
    console.log('recipe collection is initialized');
    this.addAllRecipes();
  },
