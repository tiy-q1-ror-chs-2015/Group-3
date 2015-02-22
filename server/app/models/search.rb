class Search
  require 'set'
  # produce_types = {
  # "leafy_green" => ["spinach", "kale"],
  # "root_veggie" => ["carrot", "turnip"],
  # "fruit" => ["raspberry", "blueberry"],
  # "herbs" => ["cilantro", "basil"],
  # "garden_veggie" => ["tomato", "onion"],
  # "grains_and_beans" => ["lima beans", "black beans"]
  # }

  PROTEIN_TERMS = {
    'poultry' => ['chicken'],
    'pork' => ['pork'],
    'beef' => ['beef','steak'],
    'fish' => ['salmon','halibut','talapia','swordfish','mahi'],
    'eggs' => ['egg']
  }

  PRODUCE_TERMS = {
    'leafy_green' => ['spinach','kale','lettuce', 'collard greens', 'watercress', 'turnips', 'bok choy', 'cabbage', 'swiss chard'],
    'root_veggie' => ['sweet [potato', 'carrot', 'beet', 'yam', 'turnip', 'parsnip', 'radish', 'ginger', 'rutabaga', 'potato', 'onion', 'garlic'],
    'fruit' => ['apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blueberry', 'cantaloupe', 'cherry', 'coconut', 'cranberry', 'date', 'fig', 'grape', 'raisin', 'grapefruit', 'honeydew', 'kiwi', 'lemon', 'lime', 'mango', 'watermelon', 'nectarine', 'olive', 'orange', 'papaya', 'peach', 'pear', 'plum', 'pineapple', 'pomegranate', 'raspberry', 'strawberry'],
    'herbs' => ['cliantro','basil', 'bay leaf', 'caraway', 'cayenne pepper', 'celery', 'chili powder', 'chives', 'cinnamon', 'dill', 'garlic', 'ginger', 'horseradish', 'lemongrass', 'mint', 'nutmeg', 'oregano', 'paprika', 'parsley', 'pepper', 'rosemary', 'saffron', 'sage', 'tarragon', 'thyme', 'vanilla'],
    'garden_veggie' => ['tomato','onion', 'asparagus', 'cabbage', 'celery', 'corn', 'cucumbers', 'eggplant', 'lettuce', 'green pepper', 'red pepper'],
    'grains_and_beans' => ['barley', 'rice', 'buckwheat', 'flaxseed', 'oats', 'quinoa', 'rye', 'couscous', 'wild rice', 'wheat', 'black beans', 'black-eyed peas', 'butter beans', 'lima beans', 'corona beans', 'fava beans', 'garbanzo beans', 'chickpeas', 'kidney beans', 'lentils', 'pinto beans', 'soybeans', 'peas']
  }

  RECIPE_TYPE_TERMS = {
    'appetizer' => ['Appetizers','Lunch and Snacks','Breads'],
    'breakfast' => ['Breakfast and Brunch'],
    'dessert' => ['Desserts'],
    'entree' => ['Main Dishes'],
    'side' => ['Side Dishes','Appetizers','Breads'],
    'soup_salad' => ['Soups','Salads']
  }

  # Create a new search.
  #
  # For any parameters given (protein,produce,recipe_type), collect
  # matching recipes. Return a number of records (up to limit) from
  # the instersection of the previous sets.
  # 
  # Params:
  # ------
  # :limit   - return up to this many records (may be fewer if fewer
  #            are found)
  # :offset  - offset our results (useful for pagination)
  # :protein - comma-separated list of protein keys
  # :produce - comma-separated list of produce keys
  # :type    - comma-separated list of recipe types keys
  # :q       - search term
  def self.new params
    # we are going to end up with a list of valid recipe ids given our
    # constraints (initialized to all IDs since we have not done any
    # filtering yet)
    filtered_recipe_ids = Set.new(Recipe.all.collect(&:id))
    # filter by protein if a protein parameter is given
    if params[:protein]
      # get a list of ingredients that match our protein parameters
      selected_ingredients = Set.new
      params[:protein].split(',').each do |key|
        if PROTEIN_TERMS[key]
          PROTEIN_TERMS[key].each do |term|
            selected_ingredients += Ingredient.where("name like \'%#{term}%\'").collect(&:id)
          end
        end
      end
      # and intersect our existing recipe list with the ones that have
      # these specified ingredients
      these_recipes = Set.new(RecipeIngredient.where(ingredient_id: selected_ingredients.to_a).collect(&:recipe_id))
      puts "Recipe_IDs: ", these_recipes.to_a
      filtered_recipe_ids = filtered_recipe_ids & these_recipes
    end
    # filter by produce if a protein parameter is given
    if params[:produce]
      # get a list of ingredients that match our protein parameters
      selected_ingredients = Set.new
      params[:produce].split(',').each do |key|
        if PRODUCE_TERMS[key]
          PRODUCE_TERMS[key].each do |term| 
            selected_ingredients += Ingredient.where("name like \'%#{term}%\'").collect(&:id)
          end
        end
      end
      # and intersect our existing recipe list with the ones that have
      # these specified ingredients
      these_recipes = Set.new(RecipeIngredient.where(ingredient_id: selected_ingredients.to_a).collect(&:recipe_id))
      filtered_recipe_ids = filtered_recipe_ids & these_recipes
    end
    # filter by recipe type
    if params[:type]
      # get a list of the recipe types that match our type parameters
      selected_types = Set.new
      params[:type].split(',').each do |key|
        if RECIPE_TYPE_TERMS[key]
          RECIPE_TYPE_TERMS[key].each do |term|
            selected_types += Type.where("name like \'%#{term}%\'").collect(&:id)
          end
        end
      end
      # and intersect our existing recipe list with the ones that have
      # these specified recipe types
      these_recipes = Set.new(RecipeType.where(type_id: selected_types.to_a).collect(&:recipe_id))
      filtered_recipe_ids = filtered_recipe_ids & these_recipes
    end
    # grab our filtered results
    result = Recipe.find(filtered_recipe_ids.to_a)
    # apply our search term if it exists
    if params[:q]
      result = result & Recipe.where("name like \'%#{params[:q]}%\'")
    end
    # setup appropriate limit and offset parameters
    if params[:limit]
      limit = params[:limit].to_i
    else
      limit = 10
    end
    if params[:offset]
      offset = params[:offset].to_i
    else
      offset = 0
    end
    if offset > result.count
      return []
    end
    return result[offset..offset+limit-1]
  end
end	
