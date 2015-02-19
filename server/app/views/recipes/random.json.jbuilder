json.name @recipe.name

json.ingredients @recipe.recipe_ingredients do |recipe_ingredient|
  json.id recipe_ingredient.id
  json.name Ingredient.find(recipe_ingredient.ingredient_id).name
  json.qty recipe_ingredient.quantity
end
