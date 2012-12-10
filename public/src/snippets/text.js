define([], function(){
  
  return function(input){
    var div;
    div = document.createElement('div');
    var innerDiv = document.createElement("div");
    div.id = 'text-' + Date.now();
    div.classList.add('text');
    if ( input.length > 200 ) {
      div.classList.add('unit-large');
    } else {
      div.classList.add('unit-small');
    }
    div.appendChild( innerDiv );
    innerDiv.classList.add( "inner" );
    innerDiv.appendChild(document.createTextNode(input));

    return {
      element: div
    };
  };

});
