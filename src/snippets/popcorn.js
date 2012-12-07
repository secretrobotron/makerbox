define([], function(){
  
  return function(input, masonryWall){
    var popcornPlayer, div;

    Object.keys(Popcorn.player.registry).forEach(function(key){
        if(!popcornPlayer && Popcorn.player.registry[key].canPlayType("", input)){
            popcornPlayer = Popcorn.player.registry[key];
        }
    });

    if(popcornPlayer){
      var div = document.createElement('div');
      div.id = "popcorn-" + Date.now();
      div.classList.add('popcorn-vid');
      var p = Popcorn.smart('#' + div.id, input);
      p.on('loadedmetadata', function(){
          setTimeout(function(){
              masonryWall.reload();
          }, 500);
      });
      return div;
    }
  };

});