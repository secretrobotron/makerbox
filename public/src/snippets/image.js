define(['./snippet', 'util/dom'], function(snippet, domutils){
  var urlRegex = /\.(png|jpg|gif|jpeg)/;

  return function(input){
    var urlMatch = input.match(urlRegex);
    var div, img;

    if(urlMatch){
      img = document.createElement('img');
      div = snippet.createDiv('image');
      div.classList.add('unit-small');
      img.src = input;
      div.appendChild(img);

      return {
        element: div,
        wait: function(callback){
          setTimeout(callback, 1000);
        }
      };
    }
  };

});