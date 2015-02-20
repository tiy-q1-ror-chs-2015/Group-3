class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  # RANDOM
  # ------
  # Params:
  # :limit - how many random recipes to return (default 3)
  def random
    limit = params[:limit].to_i ||= 3
    @recipes = []
    limit.times do
      @recipes.push(Recipe.random_recipe)
    end
  end

  # SEARCH
  # ------
  # Params:
  # :limit - how many random recipes to return (default 3)
  def search
    limit = params[:limit].to_i ||= 10
    @recipes = []
    limit.times do
      @recipes.push(Recipe.random_recipe)
    end
  end

  private
  
end
