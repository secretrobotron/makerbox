define([], function(){
  
  var snippet = {
    createIframe: function(type, src){
      var div = snippet.createDiv(type);
      var iframe = document.createElement('iframe');
      iframe.src = src;
      div.appendChild(iframe);
      return div;
    },
    createDiv: function(type){
      var div = document.createElement('div');
      div.id = type + '-' + Date.now();
      div.classList.add(type);
      return div;
    }
  };

  return snippet;

});