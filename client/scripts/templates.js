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


templates.random = [
'<img src="<%= item.imageSrc %>"/ >',
'<h3><%= item.name %></h3>',
].join('');
