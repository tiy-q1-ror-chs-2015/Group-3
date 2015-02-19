class Recipe < ActiveRecord::Base
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients
  has_many :recipe_directions
  has_many :directions, through: :recipe_directions
  has_many :recipe_types
  has_many :types, through: :recipe_types

  def self.random_recipe
    rand_record_idx = rand(Recipe.count)
    Recipe.offset(rand_record_idx).first
  end
end
