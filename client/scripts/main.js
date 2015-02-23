

var searchYum = {
  init: function() {
    searchYum.initEvents();
    searchYum.initStyling();
  },

  initStyling: function(){
    console.log('init styling');
  },

  initEvents: function() {
    $('.ingredients').on('click', 'span', function(e){
      e.preventDefault();
      $(this).addClass('checked');
      console.log($('.checked').html());

    });

    $('#recipeSearch').on('click', function(e){
      console.log('button fired')
      if ( $('.meat').find('.checked').html() === undefined ) {
        console.log('no meat');
        searchYum.searchNoMeat();
      }
      else if ($('.produce').find('.checked').html() === undefined) {
        console.log('no produce selected');
        searchYum.searchNoProduce();
      }
      else if ($('.type').find('.checked').html() === undefined) {
        console.log('no type selected');
        searchYum.searchNoType();
      }
      else if ($('.meat').find('.checked').html() && $('.produce').find('.checked').html() === undefined) {
        console.log('no meat or produce');
        searchYum.searchType();
      }
      else if ($('.meat').find('.checked').html() && $('.type').find('.checked').html() === undefined) {
        console.log('no meat or type');
        searchYum.searchProduce();
      }
      else if ($('.produce').find('.checked').html() && $('.type').find('.checked').html() === undefined) {
        console.log('no produce or type');
        searchYum.searchMeat();
      }
      else {
        console.log('all items checked');
        searchYum.getSearch();
      }
      $('.home').hide();
      $('.searchPage').addClass('show');

    });

    $('#goBack').on('click', function(e){
      e.preventDefault();
      $('.home').addClass('show');
      $('.searchPage').removeClass('show');
      location.reload();
    });

  },




  config: {
    baseURL:'http://localhost:9000/recipes',

  },



  getSearch: function() {
    var urlString = (searchYum.config.baseURL + '/search?protein=' + $('.meat').find('.checked').html() + '&produce=' + $('.produce').find('.checked').html() + '&type=' + $('.type').find('.checked').html() + '&limit=3').toLowerCase();

    $.ajax({
      url: urlString,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        console.log($('.meat').find('.checked').html(),$('.produce').find('.checked').html(),  $('.type').find('.checked').html());
        data.recipes.forEach(function(item, index, array){
          console.log('iteration activated. ', item.name);
          $('.options').append(
            '<article class="results">' +
            '<img src=' + item.imageSrc + ' >' +
            '<h3>' + item.name + '</h3>' +
            '</article>'
          );
        });
      },
      error: function(error){
        console.log(error);
      }
    });


  },


    // (searchYum.config.baseURL + '/search?protein=' + $('.meat').find('.checked').html() + '&produce=' + $('.produce').find('.checked').html() + '&type=' + $('.type').find('.checked').html() + '&limit=3').toLowerCase();
    //

  searchNoMeat: function() {
    var urlString = (searchYum.config.baseURL + '/search?produce=' + $('.produce').find('.checked').html() + '&type=' + $('.type').find('.checked').html() + '&limit=3').toLowerCase();

    $.ajax({
      url: urlString,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        console.log($('.meat').find('.checked').html(),$('.produce').find('.checked').html(),  $('.type').find('.checked').html());
        data.recipes.forEach(function(item, index, array){
          console.log('iteration activated. ', item.name);
          $('.options').append(
            '<article class="results">' +
            '<img src=' + item.imageSrc + ' >' +
            '<h3>' + item.name + '</h3>' +
            '</article>'
          );
        });
      },
      error: function(error){
        console.log(error);
      }
    });


  },

  searchNoProduce: function() {
    var urlString = (searchYum.config.baseURL + '/search?protein=' + $('.meat').find('.checked').html() + '&type=' + $('.type').find('.checked').html() + '&limit=3').toLowerCase();

    $.ajax({
      url: urlString,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        console.log($('.meat').find('.checked').html(),$('.produce').find('.checked').html(),  $('.type').find('.checked').html());
        data.recipes.forEach(function(item, index, array){
          console.log('iteration activated. ', item.name);
          $('.options').append(
            '<article class="results">' +
            '<img src=' + item.imageSrc + ' >' +
            '<h3>' + item.name + '</h3>' +
            '</article>'
          );
        });
      },
      error: function(error){
        console.log(error);
      }
    });

    },
  searchNoType: function() {
    var urlString = (searchYum.config.baseURL + '/search?protein=' + $('.meat').find('.checked').html() + '&produce=' + $('.produce').find('.checked').html() + '&limit=3').toLowerCase();

    $.ajax({
      url: urlString,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        console.log($('.meat').find('.checked').html(),$('.produce').find('.checked').html(),  $('.type').find('.checked').html());
        data.recipes.forEach(function(item, index, array){
          console.log('iteration activated. ', item.name);
          $('.options').append(
            '<article class="results">' +
            '<img src=' + item.imageSrc + ' >' +
            '<h3>' + item.name + '</h3>' +
            '</article>'
          );
        });
      },
      error: function(error){
        console.log(error);
      }
    });


  },


  searchType: function() {

    var urlString = (searchYum.config.baseURL + '/search?type=' + $('.type').find('.checked').html() + '&limit=3').toLowerCase();

    $.ajax({
      url: urlString,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        console.log($('.meat').find('.checked').html(),$('.produce').find('.checked').html(),  $('.type').find('.checked').html());
        data.recipes.forEach(function(item, index, array){
          console.log('iteration activated. ', item.name);
          $('.options').append(
            '<article class="results">' +
            '<img src=' + item.imageSrc + ' >' +
            '<h3>' + item.name + '</h3>' +
            '</article>'
          );
        });
      },
      error: function(error){
        console.log(error);
      }
    });


  },

  searchProduce: function() {

    var urlString = (searchYum.config.baseURL + '/search?produce=' + $('.produce').find('.checked').html() + '&limit=3').toLowerCase();

    $.ajax({
      url: urlString,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        console.log($('.meat').find('.checked').html(),$('.produce').find('.checked').html(),  $('.type').find('.checked').html());
        data.recipes.forEach(function(item, index, array){
          console.log('iteration activated. ', item.name);
          $('.options').append(
            '<article class="results">' +
            '<img src=' + item.imageSrc + ' >' +
            '<h3>' + item.name + '</h3>' +
            '</article>'
          );
        });
      },
      error: function(error){
        console.log(error);
      }
    });


  },

  searchMeat: function() {

    var urlString = (searchYum.config.baseURL + '/search?protein=' + $('.meat').find('.checked').html() + '&limit=3').toLowerCase();

    $.ajax({
      url: urlString,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        console.log($('.meat').find('.checked').html(),$('.produce').find('.checked').html(),  $('.type').find('.checked').html());
        data.recipes.forEach(function(item, index, array){
          console.log('iteration activated. ', item.name);
          $('.options').append(
            '<article class="results">' +
            '<img src=' + item.imageSrc + ' >' +
            '<h3>' + item.name + '</h3>' +
            '</article>'
          );
        });
      },
      error: function(error){
        console.log(error);
      }
    });


  }
};

$(document).ready(function(){

  var recipeCollection = new RecipeCollection();
  recipeCollection.fetch().then(function () {
    var recipeCollectionView = new RecipeCollectionView({collection: recipeCollection});

  });
  searchYum.init();
});
