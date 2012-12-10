define(['./snippet'], function(snippet){  
  var urlRegex = /(http(s)?:\/\/)?www.flickr.com\/([^\/]+)\/([^\/$]+)/;

  return function(input){
    var urlMatch = input.match(urlRegex);
    var div;

    if(urlMatch && urlMatch[3] === 'photos'){
      div = snippet.createIframe('flickr', 'http://www.flickr.com/slideShow/index.gne?user_id=' + urlMatch[4]);

      div.classList.add('portrait');
      div.classList.add('unit-small');

      return {
        element: div,
        explode: function(){

        }
      };
    }
  };

});