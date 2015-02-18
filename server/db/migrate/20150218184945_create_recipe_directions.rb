class CreateRecipeDirections < ActiveRecord::Migration
  def change
    create_table :recipe_directions do |t|
      t.integer :recipe_id
      t.integer :step_idx
      t.integer :duration

      t.timestamps null: false
    end
  end
end
