class CreateFlavorProfiles < ActiveRecord::Migration
  def change
    create_table :flavor_profiles do |t|
      t.integer :recipe_id
      t.float :piquant
      t.float :meaty
      t.float :bitter
      t.float :sweet
      t.float :sour
      t.float :salty

      t.timestamps null: false
    end
  end
end
