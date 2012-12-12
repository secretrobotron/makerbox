define(['./snippet', 'util/dom'], function(snippet){
  var urlRegex = /(http(s)?:\/\/)?thimble.webmaker.org\/p\/([^$]+)/;

  return function(input){
    var urlMatch = input.match(urlRegex);
    var div;

    if(urlMatch){
      div = snippet.createIframe('thimble', 'http://thimble.webmaker.org/p/' + urlMatch[3]);
      div.querySelector('iframe').classList.add('unit-small');

      var explodeItems = [
        'Large Awesome Animals',
        'https://thimble.webmaker.org/s/zoo-large/frame.png',
        'https://thimble.webmaker.org/s/zoo-large/whale-tail.png',
        'https://thimble.webmaker.org/s/zoo-large/whale-body.png',
        'https://thimble.webmaker.org/s/zoo-large/whale-head.png'
      ];

      return {
        element: div,
        explode: function(){
          return explodeItems;
        },
        edit: 'http://thimble.webmaker.org/p/' + urlMatch[3] + '/edit'
      };
    }
  };

});