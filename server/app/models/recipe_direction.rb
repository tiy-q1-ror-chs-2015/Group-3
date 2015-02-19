class RecipeDirection < ActiveRecord::Base
  belongs_to :recipe
  belongs_to :direction
end
