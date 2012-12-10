define([], function(){
  
  return function(input){
    var div;
    if(input.indexOf('.') > -1 && input.indexOf(' ') === -1){
      div = document.createElement('div');
      div.id = 'url-' + Date.now();
      div.classList.add('url');
      var a = document.createElement('a');
      a.href = input;
      a.appendChild(document.createTextNode(input));
      div.appendChild(a);

      return {
        element: div
      }
    }
  };

});