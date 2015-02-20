class AddAdditionalFieldsToRecipe < ActiveRecord::Migration
  def change
    add_column :recipes, :total_time, :string
    add_column :recipes, :rating, :integer
    add_column :recipes, :number_of_servings, :integer
    add_column :recipes, :source_site_url, :text
    add_column :recipes, :source_recipe_url, :text
  end
end
