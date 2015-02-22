# Group-3

## Rails Server Component

### Initializing and Running the Rails Server

1) Make sure everything is up-to-date by pulling most recent changes
from github.

2) Make sure all ruby gems are installed.

``` sh
# cd out and back in to the server directory so that rvm picks up the
# correct gemset
# cd .. (if already in server directory)
cd server

# use bundler to make sure gems are up-to-date
bundle
```

3) Initialize the database.

``` sh
# from the server directory, run our db:setup rake task, this will:
# - create the database
# - load current schema
# - load seed data (which we had previously grabbed from Yummly)
rake db:setup
```

4) Start the server on localhost:9000

``` sh
# from the server directory start the rails server in a dedicated
# terminal window (do not detach so that server errors can be debugged
# from console)
rails s -p 9000
```

## Rails API

### GET Recipe

Render recipe details for recipe with given {id} -- *in this case the
id is 22*.

**Request:**

```
http://localhost:9000/recipes/22
```

**Response:**

``` json
{
  "id": 22,
  "name": "Mexican Lasagna",
  "totalTime": "50 Min",
  "rating": 4,
  "numberOfServings": 8,
  "imageSrc": "http://lh5.ggpht.com/-GeVA30Y_t3llv2uWrKpEzyAAJbYI74ocVSyU261vh4yB4B8t_0WO5Cmjxodxrv7_iDABrfeWHS5RwWdVrt5Tw=s360",
  "flavorProfile": {
    "recipe_id": 22,
    "id": 22,
    "piquant": 0.6667,
    "meaty": 1,
    "bitter": 0.6667,
    "sweet": 0.1667,
    "sour": 0.1667,
    "salty": 0.6667,
    "created_at": "2015-02-21T15:46:21.161Z",
    "updated_at": "2015-02-21T15:46:21.161Z"
  },
  "recipeTypes": [
    "Main Dishes",
    "Lunch and Snacks"
  ],
  "cuisines": [
    "Southwestern",
    "Mexican"
  ],
  "ingredients": [
    {
      "name=": "ragu old world style pasta sauc"
    },
    {
      "name=": "ground beef"
    },
    {
      "name=": "whole kernel corn, drain"
    },
    {
      "name=": "chili powder"
    },
    {
      "name=": "flour tortillas"
    },
    {
      "name=": "shredded cheddar cheese"
    }
  ],
  "directions": [
    {
      "idx=": 1,
      "direction=": "Dolores alias quasi qui autem sequi excepturi quo aliquid ut eligendi saepe id voluptatem."
    },
    {
      "idx=": 2,
      "direction=": "Sit et quae autem natus dignissimos magni vitae eum accusantium vero."
    },
    {
      "idx=": 3,
      "direction=": "Non architecto maxime in assumenda sed delectus eum corrupti consequuntur sequi."
    }
  ]
}
```

### GET Random Recipes

Return some number of random recipes.

**Request:**

```
/recipes/random?limit=3
```

**Response:**

``` json
{
  "recipes": [
    {
      "id": 73,
      "name": "Honey Baked Chicken",
      "totalTime": "1 hr 45 min",
      "rating": 4,
      "numberOfServings": 4,
      "imageSrc": "http://lh3.ggpht.com/3WNeFWNsDBMbbVzCKJf8QnF_nIPBPjWXbGD7ZkKipdHkFKocdsfOZ_KR2wTjyIdG5nh53nHFwLYPuC8knZIDrg=s360",
      "flavorProfile": {
        "recipe_id": 73,
        "id": 73,
        "piquant": 0.6667,
        "meaty": 0.3333,
        "bitter": 0.6667,
        "sweet": 1,
        "sour": 0.1667,
        "salty": 1,
        "created_at": "2015-02-21T15:46:21.310Z",
        "updated_at": "2015-02-21T15:46:21.310Z"
      }
    },
    {
      "id": 100,
      "name": "B.B.Q. Garlic Crab",
      "totalTime": "23 Min",
      "rating": 5,
      "numberOfServings": 6,
      "imageSrc": null,
      "flavorProfile": {
        "recipe_id": 100,
        "id": 100,
        "piquant": 0,
        "meaty": 0.1667,
        "bitter": 0.1667,
        "sweet": 0.1667,
        "sour": 0.3333,
        "salty": 0,
        "created_at": "2015-02-21T15:46:21.387Z",
        "updated_at": "2015-02-21T15:46:21.387Z"
      }
    },
    {
      "id": 193,
      "name": "Rosemary Salmon",
      "totalTime": "1 hr",
      "rating": 3,
      "numberOfServings": 4,
      "imageSrc": "http://lh4.ggpht.com/zQc3oE2ntRjoubTTxyVLLOUpT5KUJUFFrzxWPfy0-d71fWXWdUC7srta6aME5iRaoSH8aiKklaJG8kVvl4zbx6g=s360",
      "flavorProfile": {
        "recipe_id": 193,
        "id": 193,
        "piquant": 0.1667,
        "meaty": 0.8333,
        "bitter": 0.8333,
        "sweet": 0.1667,
        "sour": 0.5,
        "salty": 0.6667,
        "created_at": "2015-02-21T15:46:21.634Z",
        "updated_at": "2015-02-21T15:46:21.634Z"
      }
    }
  ]
}
```
### GET Search Recipes

For any parameters given (protein,produce,recipe_type), collect
matching recipes. Return a number of records (up to limit) from
the instersection of the previous sets.

**Params:**

:limit: return up to this many records (may be fewer if fewer are found)
:offset: offset our results (useful for pagination)
:protein: comma-separated list of protein keys
:produce: comma-separated list of produce keys
:type: comma-separated list of recipe types keys
:q: search term

**Request:**

```
http://localhost:9000/recipes/search?protein=poultry,pork&type=entree&q=slow&limit=2
```

**Response:**

``` json
{
  "recipes": [
    {
      "id": 2,
      "name": "Slow-Cooker Garlic Chicken with Couscous",
      "totalTime": "4 Hr",
      "rating": 5,
      "numberOfServings": 4,
      "imageSrc": "http://lh5.ggpht.com/vYEBpJPf0FfGnSynbdNyH03mgPkWDUc9vfmk1oPcSCYDBL6wBFfu41CtNOoy4jdCwPGC6bntYszfnvpar71n=s360",
      "flavorProfile": {
        "recipe_id": 2,
        "id": 2,
        "piquant": 0,
        "meaty": 1,
        "bitter": 0.8333,
        "sweet": 0.3333,
        "sour": 0.8333,
        "salty": 0.3333,
        "created_at": "2015-02-21T15:46:21.092Z",
        "updated_at": "2015-02-21T15:46:21.092Z"
      }
    },
    {
      "id": 10,
      "name": "Slow Cooker Orange Chicken",
      "totalTime": "3 hr 20 min",
      "rating": 4,
      "numberOfServings": 1,
      "imageSrc": "http://lh4.ggpht.com/VW-ZYXunzEmcLsRhoody9tADZZfJCDIaIvM0fuLjg_Pi8wB_ahvMN48E78YOut95fns15DwCKSTNo6n6xAUeHQ=s360",
      "flavorProfile": {
        "recipe_id": 10,
        "id": 10,
        "piquant": 0,
        "meaty": 0.1667,
        "bitter": 0.5,
        "sweet": 0.5,
        "sour": 0.1667,
        "salty": 0.6667,
        "created_at": "2015-02-21T15:46:21.114Z",
        "updated_at": "2015-02-21T15:46:21.114Z"
      }
    }
  ]
}
```
