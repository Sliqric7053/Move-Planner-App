function loadData() {
  const $body = $('body');
  const $wikiElem = $('#wikipedia-links');
  const $nytHeaderElem = $('#nytimes-header');
  const $nytElem = $('#nytimes-articles');
  const $greeting = $('#greeting');
  const $street = $('#street');
  const $city = $('#city');

  // clear out old data before new request
  $wikiElem.text('');
  $nytElem.text('');

  // load streetview
  const apikey = 'tIeCgw4YfyqUOqfzPRQks8z8I2tjGGZn';
  const city = $city.val();
  const address = city;

  $greeting.text('So you want to live in ' + address.toUpperCase() + '?');

  //setup src
  const src =
    'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' +
    address +
    '';

  const unsplashUrl = 'https://source.unsplash.com/daily?city,';
  const backgroundImage = unsplashUrl + city.replace(/\s/g, '').toUpperCase();

  //append <img> to the page
  $body.append('<img class="bgimg" src= "' + backgroundImage + '">');

  const nyTimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${city}&api-key=${apikey}
  `;

  $.getJSON(nyTimesUrl, function(data) {
    $nytHeaderElem.text('New York Times Articles About: ' + city.toUpperCase());

    articles = data.response.docs;
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      $nytElem.append(
        '<li class="article">' +
          '<a href="' +
          article.web_url +
          '">' +
          article.headline.main +
          '</a>' +
          '<p>' +
          article.snippet +
          '</p>' +
          '</li>'
      );
    }
  }).error(function(err) {
    $nytHeaderElem.text(
      'New York Times Articles About ' +
        city.toUpperCase() +
        ' Could Not Be Loaded'
    );
  });

  //do $.ajax and add wikipedia articles
  const wikiUrl =
    'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
    city +
    '&format=json&callback=wikiCallback';

  // create a setTimeout to handle errors
  const wikiRequestTimeout = setTimeout(function() {
    $wikiElem.text('Failed to get Wikipedia resources! Try again later..');
  }, 8000);

  $.ajax({
    url: wikiUrl,
    dataType: 'jsonp',
    // jsonp: 'callback', --> explanation: some api require you use a different name for the callback function. But by default, setting dataType: 'jsonp' sets jsonp: 'callback' hence this line parameter is redundant
    success: function(response) {
      const articleList = response[1];

      for (let i = 0; i < articleList.length; i++) {
        articleStr = articleList[i];
        // console.log('articleStr: ' + articleStr);
        const url = 'https://en.wikipedia.org/wiki/' + articleStr;
        // console.log('url: ' + url);
        $wikiElem.append(
          '<li><a href="' + url + '">' + articleStr + '</a></li>'
        );
      }
      //clear setTimeout so the $wikiElem does not get overwritten
      clearTimeout(wikiRequestTimeout);
    },
  });

  return false;
}

$('#form-container').submit(loadData);
