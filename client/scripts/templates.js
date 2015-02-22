//recipe template
var templates = {};

templates.results = [
'<img src="<%= item.imageSrc %>"/ >',
'<h3><%= item.name %></h3>',
].join('');



templates.searchResults = [
'<article class="results">',
'<img src="<%= imageSrc %>"/>',
'<h3><%= name %></h3>',
'</article>'
].join('');
// 
// templates.search = [
// '<form action="" id="search">',
// '<div class="input-group">',
// '<input class="form-control" id="query" name="query" type="text" value="<%= query %>" />',
// '<button type="submit" class="btn btn-primary" type="button">Search</button>',
// '</div>',
// '</form>'
// ].join('');
