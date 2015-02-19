class AddImageToRecipes < ActiveRecord::Migration
  def change
    add_column :recipes, :image_src, :text
  end
end
