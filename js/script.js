
function loadData() {

    var $body          = $('body');
    var $wikiElem      = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem       = $('#nytimes-articles');
    var $greeting      = $('#greeting');
    var $street        = $('#street');
    var $city          = $('#city');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var apikey = 'f14a4de199f441e18ac07aa456801202';
    var street = $street.val();
    var city = $city.val();
    var address = street + ', ' + city;

    $greeting.text('So you want to live at ' + address.toUpperCase() + '?');

    //setup src
    var src = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '';
    // console.log(src);

    //append <img> to the page
    $body.append('<img class="bgimg" src= "' + src + '">');



    //do $.getJSON and add NYT articles
    var nyTimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest' + apikey;
    // console.log(nyTimesUrl);
    $.getJSON(nyTimesUrl, function(data) {
      // console.log(data);
      $nytHeaderElem.text('New York Times Articles About: ' + city.toUpperCase());

    articles = data.response.docs;
    for (var i = 0; i < articles.length; i++) {
      var article = articles[i];
      $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
                      '<p>' + article.snippet + '</p>' + '</li>');
    }
  }).error(function(err) {
      $nytHeaderElem.text('New York Times Articles About ' + city.toUpperCase() + ' Could Not Be Loaded');

  });

  //do $.ajax and add wikipedia articles
  var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';
  // console.log('wikiUrl: ' + wikiUrl);

  // create a setTimeout to handle errors
  var wikiRequestTimeout = setTimeout(function() {
    $wikiElem.text('Failed to get Wikipedia resources! Try again later..')
  }, 8000);

  $.ajax({
    url: wikiUrl,
    dataType: 'jsonp',
    // jsonp: 'callback', --> explanation: some api require you use a different name for the callback function. But by default, setting dataType: 'jsonp' sets jsonp: 'callback' hence this line parameter is redundant
    success: function(response) {
      // console.log('response: ' + response);
      var articleList = response[1];

      for (var i = 0; i < articleList.length; i++) {
        articleStr = articleList[i];
        // console.log('articleStr: ' + articleStr);
        var url = 'https://en.wikipedia.org/wiki/' + articleStr;
        // console.log('url: ' + url);
        $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
      };
      //clear setTimeout so the $wikiElem does not get overwritten
      clearTimeout(wikiRequestTimeout);
    }
  });


  return false;
};

$('#form-container').submit(loadData);
