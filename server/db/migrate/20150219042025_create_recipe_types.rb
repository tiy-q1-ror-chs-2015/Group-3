class CreateRecipeTypes < ActiveRecord::Migration
  def change
    create_table :recipe_types do |t|

      t.timestamps null: false
    end
  end
end
