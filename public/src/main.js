require.config({
    context: 'makerbox',
    baseUrl: 'src',
    paths: {
      'text': '../lib/text',
    }
})([
  'snippets/flickr', 'snippets/googlemap', 'snippets/popcorn',
  'snippets/text', 'snippets/url', 'snippets/popcorn-maker',
  'snippets/image', 'snippets/wikipedia',
  'util/dom', 'text!layouts/explode-container.html' ],
  function(
    flickr_snippet, googlemap_snippet, popcorn_snippet,
    text_snippet, url_snippet, popcornmaker_snippet,
    image_snippet, wikipedia_snippet,
    domutils, explode_container
    ){

  var snippets = [
    wikipedia_snippet,
    image_snippet,
    popcornmaker_snippet,
    flickr_snippet,
    googlemap_snippet,
    popcorn_snippet,
    url_snippet,
    text_snippet
  ];

  var explodeContainer = domutils.fragment(explode_container, '.explode-container');

  function start(){
    var urlInput = document.querySelector('.input-container input');
    var wallDiv = document.querySelector('.wall');

    var masonryWall = window._m = new Masonry(wallDiv, {
      isFitWidth: true,
      columnWidth: 275,
      gutterWidth: 10
    });

    function findSnippetMatch(urlInputValue){
      return snippets.reduce(function(previous, snippet){
        return previous || snippet(urlInputValue);
      }, null);
    }

    function addItem(item, insertAfterElement){
      var rootElement;
      var explodeButton, miniMenu, miniMenuInner;

      rootElement = item.element;

      if(item.explode){
        miniMenu = explodeContainer.querySelector('.mini-menu').cloneNode(true);
        rootElement.appendChild(miniMenu);

        explodeButton = rootElement.querySelector('.explode-button');
        miniMenu = rootElement.querySelector('.mini-menu > a');
        miniMenuInner = rootElement.querySelector('.mini-menu-inner');

        miniMenu.addEventListener('click', function() {
          miniMenuInner.classList.toggle('on');
        }, false );

        explodeButton.addEventListener('click', function addExploded(){
          var newItems = Array.prototype.slice.call(item.explode());

          newItems.forEach(function(item){
            console.log(item);
            if(typeof item === 'string'){
              addItem(findSnippetMatch(item), rootElement);
            }
            else {
              wallDiv.appendChild(item);
            }
          });

          explodeButton.removeEventListener('click', addExploded, false);
          explodeButton.style.display = 'none';

          masonryWall.reload();
        }, false);
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

    wallDiv.classList.add('on');

    urlInput.addEventListener('keypress', function(e){

      if(e.which === 13 && urlInput.value.replace(/\s/g, '').length > 0){
        var snippetMatch = findSnippetMatch(urlInput.value);
        urlInput.value = "";

        if(snippetMatch){
          addItem(snippetMatch);
        }
      }
    }, false);

    addItem(findSnippetMatch('http://popcorn.webmadecontent.org/aur_'));
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start, false);
  }
  else {
    start();
  }

});