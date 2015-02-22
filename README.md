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
