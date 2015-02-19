class AddColumnsToRecipeType < ActiveRecord::Migration
  def change
  	add_column :recipe_types, :recipe_id, :integer
  	add_column :recipe_types, :type_id, :integer
  end
end
