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
json.ingredients @ingredients do |ingredient|
  json.name = ingredient.name
end
# directions
json.directions @directions do |direction|
  json.idx = direction.step_idx
  json.direction = direction.desc
end
