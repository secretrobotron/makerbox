define([], function(){
  
  return function(input){
    var div, innerDiv;
    if(input.indexOf('.') > -1 && input.indexOf(' ') === -1){
      innerDiv = document.createElement('div');

      div = document.createElement('div');
      div.id = 'url-' + Date.now();
      div.classList.add('url');

      var a = document.createElement('a');
      a.href = input;
      a.appendChild(document.createTextNode(input));

      innerDiv.classList.add( "inner" );
      innerDiv.appendChild(a);

      div.appendChild( innerDiv );

      return {
        element: div
      }
    }
  };

});