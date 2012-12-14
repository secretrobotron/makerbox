define(['./snippet', 'util/xhr'], function(snippet, xhrutils){
  var urlRegex = /(http(s)?:\/\/)?popcorn.webmadecontent.org\/([^\/$\?&]+)/;

  return function(input){
    var urlMatch = input.match(urlRegex);
    var div;

    if(urlMatch){
      var inIframeUrl = urlMatch[3].lastIndexOf('_');

      div = snippet.createIframe('popcorn-maker', 'http://popcorn.webmadecontent.org/' + urlMatch[3]);
      div.querySelector('iframe').classList.add('unit-large');

      var explodeItems = [
        'http://maps.google.com/maps?t=h&amp;hl=en&amp;layer=c&amp;cbll=57.136967,-2.167779&amp;cbp=12,245.99,,3,7.84&amp;ie=UTF8&amp;hq=&amp;hnear=Belfast,+County+Antrim+BT9+7DU,+United+Kingdom&amp;panoid=WR_NiDOeEnuaVffNZnM6Lg&amp;ll=57.136894,-2.16763&amp;spn=0.001022,0.002411&amp;z=19&amp;source=embed&amp;output=svembed',
        'www.flickr.com/photos/69002638@N08/',
        'http://popcorn.webmadecontent.org/images/Popcorn_Maker_wordmark_white.png',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'http://farm9.staticflickr.com/8440/7999652674_dd75e957fb_k.jpg',
        'http://en.m.wikipedia.org/wiki/The_Life_and_Death_of_Colonel_Blimp'
      ];

      // var 
      // if(urlMatch)

      // xhrutils.get()

      return {
        element: div,
        identifier: 'http://popcorn.webmaker.org',
        explode: function(){
          return explodeItems;
        },
        edit: 'http://popcorn.webmaker.org/templates/basic/?savedDataUrl=/api/remix/37'
      };
    }
  };

});