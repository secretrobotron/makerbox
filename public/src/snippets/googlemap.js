define([], function(){
  
  return function(input){
    var parsedUri = parseUri(input);
    var div;
    
    if(parsedUri.host === 'maps.google.com'){
      div = document.createElement('div');
      div.id = 'googlemap-' + Date.now();
      div.classList.add('googlemap');
      var iframe = document.createElement('iframe');
      parsedUri.queryKey.source = 'embed';
      parsedUri.queryKey.output = 'svembed';
      iframe.src = parsedUri.protocol + '://' + parsedUri.host + parsedUri.path + '?' + Object.keys(parsedUri.queryKey).map(function(key){return key  + '=' + parsedUri.queryKey[key]}).join('&');
      div.appendChild(iframe);
      return {
        element: div
      };
    }    
  };

});