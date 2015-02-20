json.id @recipe.id
json.name @recipe.name
json.totalTime @recipe.total_time
json.rating @recipe.rating
json.numberOfServings @recipe.number_of_servings
json.imageSrc @recipe.image_src
json.flavorProfile @recipe.flavor_profile
json.recipeTypes @recipe.types.map(&:name)
json.cuisines @recipe.cuisines.map(&:name)
# ingredients
json.ingredients @recipe.recipe_ingredients do |recipe_ingredient|
  ingredient = Ingredient.find(recipe_ingredient.ingredient_id)
  json.name = ingredient.name
  json.qty = recipe_ingredient.quantity
end
