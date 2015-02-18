class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all
  end

  def random
    rand_record_idx = rand(Recipe.count)
    @recipe = Recipe.offset(rand_record_idx).first
  end
end
