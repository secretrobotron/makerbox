define(['util/dom', 'text!layouts/explode-container.html', 'mini-menu'],
  function(domutils, explode_container, mini_menu){
  
  var __explodeContainer = domutils.fragment(explode_container, '.explode-container');

  function Wall(wallDiv, snippetManager){

    var masonryWall = new Masonry(wallDiv, {
      isFitWidth: true,
      columnWidth: 70,
      gutterWidth: 10
    });

    function addItem(item, insertAfterElement){
      var rootElement;
      var explodeButton, miniMenu, editButton;

      rootElement = item.element;

      rootElement.classList.add('panel');

      function onEdit(url){
        appContainer.classList.add('on');
        appIframe.src = url;
      }

      function onExplode(items){
        items.forEach(function(item){
          if(typeof item === 'string'){
            addItem(snippetManager.matchSnippet(item), rootElement);
          }
          else {
            wallDiv.appendChild(item);
          }
        });
      }

      if(item.explode || item.edit || item.identifier){
        miniMenuDiv = __explodeContainer.querySelector('.mini-menu').cloneNode(true);
        rootElement.appendChild(miniMenuDiv);

        miniMenu = new mini_menu.MiniMenu(item, miniMenuDiv);

        item.explode ? miniMenu.enableExplodeButton(onExplode) : miniMenu.disableExplodeButton();
        item.edit ? miniMenu.enableEditButton(onEdit) : miniMenu.disableEditButton();
        item.identifier ? miniMenu.enableIdentifierButton() : miniMenu.disableIdentifierButton();
      }

      if(insertAfterElement){
        if(insertAfterElement.nextSibling){
          wallDiv.insertBefore(rootElement, insertAfterElement.nextSibling);
        }
        else {
          wallDiv.appendChild(rootElement); 
        }
      }
      else {
        wallDiv.insertBefore(rootElement, wallDiv.firstChild);
      }

      if(item.wait){
        item.wait(function(){
          masonryWall.reload();
        });
      }
      else {
        masonryWall.reload();
      }
    }

    this.add = function(input){
      var snippetMatch = snippetManager.matchSnippet(input);
      if(snippetMatch){
        addItem(snippetMatch);
      }
      return snippetMatch;
    }

  }

  return {
    Wall: Wall
  };

});