define([], function(){
  
  return function(input){
    div = document.createElement('div');
    var innerDiv = document.createElement("div");
    div.id = 'text-' + Date.now();
    div.classList.add('text');
    div.classList.add('unit-small');
    div.appendChild( innerDiv );
    innerDiv.classList.add( "inner" );
    innerDiv.appendChild(document.createTextNode(input));

    return {
      element: div
    };
  };

});