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
      search_result = Yummly.search(term, requirePictures:true, maxResults:100)
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
        # save the recipe
        recipe.save!
      end
    end
  end
end
