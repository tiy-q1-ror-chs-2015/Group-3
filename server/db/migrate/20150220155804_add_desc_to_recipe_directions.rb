class AddDescToRecipeDirections < ActiveRecord::Migration
  def change
    add_column :recipe_directions, :desc, :text
  end
end
