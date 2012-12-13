define(['./snippet'], function(snippet){
  var urlRegex = /wikipedia.org\/wiki\/([^$]+)/;

  return function(input){
    var urlMatch = input.match(urlRegex);
    var div;

    if(urlMatch){
      div = snippet.createIframe('wikipedia', 'http://en.m.wikipedia.org/wiki/' + urlMatch[1]);
      div.classList.add('unit-small');
      div.classList.add('portait');

      return {
        element: div
      };
    }
  };

});