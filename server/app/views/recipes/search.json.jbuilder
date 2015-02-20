json.recipes @recipes do |recipe|
  json.id recipe.id
  json.name recipe.name
  json.totalTime recipe.total_time
  json.rating recipe.rating
  json.numberOfServings recipe.number_of_servings
  json.imageSrc recipe.image_src
  json.flavorProfile recipe.flavor_profile
end
