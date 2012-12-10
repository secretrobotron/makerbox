define([], function(){
  
  return function(input){
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

      return {
        element: div,
        wait: function(callback){
          var p = Popcorn.smart('#' + div.id, input);
          p.on('loadedmetadata', function(){
            setTimeout(function(){
              callback();
            }, 100);
          });
        }
      };
    }
  };

});