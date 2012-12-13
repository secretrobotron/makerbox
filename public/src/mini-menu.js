define([], function(){
  
  function MiniMenu(item, menuDiv){

    var explodeButton = menuDiv.querySelector('.explode-button');
    var editButton = menuDiv.querySelector('.edit-button');
    var identifierButton = menuDiv.querySelector('.identifier-button');

    this.enableExplodeButton = function(callback){
      explodeButton.addEventListener('click', function addExploded(){
        var newItems = Array.prototype.slice.call(item.explode());

        callback(newItems);

        explodeButton.removeEventListener('click', addExploded, false);
        explodeButton.style.display = 'none';

        masonryWall.reload();
      }, false);
    };

    this.disableExplodeButton = function(){
      explodeButton.parentNode.removeChild(explodeButton);
    };

    this.enableEditButton = function(callback){
      if(item.edit.indexOf('[app]') === 0){
        editButton.addEventListener('click', function(e){
          callback(item.edit.substr(5));
        }, false);
      }
      else {
        editButton.href = item.edit;
      }
    };

    this.disableEditButton = function(){
      editButton.parentNode.removeChild(editButton);
    };

    this.enableIdentifierButton = function(){
      identifierButton.href = item.identifier;
    };

    this.disableIdentifierButton = function(){
      identifierButton.parentNode.removeChild(identifierButton);
    };

  }

  return {
    MiniMenu: MiniMenu
  };

});