class Search
	# produce_types = {
	# "leafy_green" => ["spinach", "kale"],
	# "root_veggie" => ["carrot", "turnip"],
	# "fruit" => ["raspberry", "blueberry"],
	# "herbs" => ["cilantro", "basil"],
	# "garden_veggie" => ["tomato", "onion"],
	# "grains_and_beans" => ["lima beans", "black beans"]
	# }

	def self.search_by_ingredient_type ingredient_type
		# ingredients = produce_types[ingredient_type]
		Ingredient.where("name LIKE ?", "%#{ingredient_type}%")
	end	
end	