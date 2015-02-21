class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all
  end

  # CREATE
  # ------
  # FrontEndParams:
  # - recipeName
  # - ingredients (newline delimited)
  # - instructions (newline delimited)
  # - image (url)
  def create
    name = params[:recipeName]
    ingredients = params[:ingredients].split('\n')
    instructions = params[:instructions].split('\n')
    image_src = params[:image]
    # create new recipe and add params
    @new_recipe = Recipe.new(name: name, image_src: image_src)
    # add the ingredients for the recipe
    ingredients.each do |ingredient|
      this_ingredient = Ingredient.find_or_create_by(name: ingredient)
      @new_recipe.ingredients.push(this_ingredient)
    end
    # add the instructions for the recipe
    order_key = 0
    instructions.each do |instruction|
      @new_recipe.recipe_directions.push(RecipeDirection.create!(desc: instruction, step_idx: order_key += 1))
    end
    if @new_recipe.save
      respond_to do |format|
        format.json { render json: @new_recipe.to_json }
      end 
    else
      respond_to do |format|
        format.json { render json: @new_recipe.errors.full_messages, status: 422 }
      end
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  # RANDOM
  # ------
  # Params:
  # :limit - how many random recipes to return (default 3)
  def random
    if params[:limit]
      limit = params[:limit].to_i
    else
      limit = 3
    end
    @recipes = []
    limit.times do
      @recipes.push(Recipe.random_recipe)
    end
  end

  # SEARCH
  # ------
  # Params:
  # :limit - how many recipes to return in search results (default 10)
  def search
    if params[:limit]
      limit = params[:limit].to_i
    else
      limit = 10
    end
    @recipes = []
    limit.times do
      @recipes.push(Recipe.random_recipe)
    end
  end
end
