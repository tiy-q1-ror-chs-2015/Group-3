class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all
  end

  def random
    @recipe = Recipe.random_recipe
  end

  def search
    # right now we are ignoring all parameters and returning 10 random
    # recipes
    # TODO: implement real search
    @recipes = []
    10.times do
      @recipes.push(Recipe.random_recipe)
    end
  end
end
