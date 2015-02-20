class CreateRecipeCuisines < ActiveRecord::Migration
  def change
    create_table :recipe_cuisines do |t|
      t.integer :recipe_id
      t.integer :cuisine_id

      t.timestamps null: false
    end
  end
end
