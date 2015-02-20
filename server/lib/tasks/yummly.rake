namespace :yummly do
  desc "TODO"
  task get_recipes: :environment do

    # list of search terms to use with yummly
    search_terms = [
      'hamburger',
      'onion soup',
      'salad',
      'pizza',
      'salmon',
      'taco',
      'burrito',
      'mexican',
      'pasta',
      'cheese appetizer',
      'finger food',
      'wings',
      'cheesecake',
      'ice cream',
      'velvet cake',
      'pastry',
    ]

    # for each of the above search terms, get search results from
    # Yummly, limit results to 1000 records each time, and get those
    # data
    search_terms.each do |term|
      # let the user know what's going on...
      puts "Getting recipes: " + term
      search_params = {q: term, requirePictures:true, maxResults:100}
      search_result = Yummly.search(search_params)
      search_result.each do |yummly_recipe|
        # add the recipe to the database
        recipe = Recipe.create!(name: yummly_recipe.name )
        # for each recipe, add all of the recipes ingredients to the
        # ingredient table (if they are not already in there), and
        # associate the ingredient with the recipe
        yummly_recipe.ingredients.each do |yummly_ingredient|
          ingredient = Ingredient.find_or_create_by!(name: yummly_ingredient)
          recipe.ingredients.push(ingredient)
        end
        # get image for recipe
        yummly_ind_recipe = Yummly.find(yummly_recipe.id)
        recipe.image_src = yummly_ind_recipe.images[0].large_url
        # add the number of servings
        recipe.number_of_servings = yummly_ind_recipe.json["numberOfServings"]
        # add total time for recipe
        recipe.total_time = yummly_ind_recipe.json["totalTime"]
        # add the rating for the recipe
        recipe.rating = yummly_ind_recipe.json["rating"]
        # add the source site url
        recipe.source_site_url = yummly_ind_recipe.json["source"]["sourceSiteUrl"]
        # add the source recipe url
        recipe.source_recipe_url = yummly_ind_recipe.json["source"]["sourceRecipeUrl"]
        # add category for recipe, add to the recipe type table if it
        # does not already exist
        if yummly_ind_recipe.json["attributes"]["course"]
          yummly_ind_recipe.json["attributes"]["course"].each do |type|
            course_type = Type.find_or_create_by!(name: type)
            recipe.types.push(course_type)
          end
        end
        # add the cusine for the recipe, add the cusine to the cuisne
        # table if it does not already exist
        if yummly_ind_recipe.json["attributes"]["cuisine"]
          yummly_ind_recipe.json["attributes"]["cuisine"].each do |type|
            cuisine_type = Cuisine.find_or_create_by!(name: type)
            recipe.cuisines.push(cuisine_type)
          end
        end
        # add the flavor profile for the recipe
        flavor_hash = yummly_ind_recipe.json["flavors"]
        lower_case_flavor_hash = {}
        flavor_hash.each { |k,v| lower_case_flavor_hash[k.downcase]=v }
        new_flavor_profile = FlavorProfile.create!(lower_case_flavor_hash)
        recipe.flavor_profile = new_flavor_profile
        # save the recipe
        recipe.save!
      end
    end
  end
end
