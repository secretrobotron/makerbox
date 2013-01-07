require.config({
    context: 'makerbox',
    baseUrl: 'src',
    paths: {
      'text': '../lib/text',
    }
})([
  'snippets/flickr', 'snippets/googlemap', 'snippets/popcorn',
  'snippets/text', 'snippets/url', 'snippets/popcorn-maker',
  'snippets/image', 'snippets/wikipedia', 'snippets/thimble',
  'wall', 'snippet-manager'],
  function(
    flickr_snippet, googlemap_snippet, popcorn_snippet,
    text_snippet, url_snippet, popcornmaker_snippet,
    image_snippet, wikipedia_snippet, thimble_snippet,
    wall, snippet_manager
    ){

  function start(){
    var urlInput = document.querySelector('.input-container input');
    var wallDiv = document.querySelector('.wall');

    var snippetManager = new snippet_manager.SnippetManager();

    snippetManager.addSnippet(wikipedia_snippet);
    snippetManager.addSnippet(image_snippet);
    snippetManager.addSnippet(thimble_snippet);
    snippetManager.addSnippet(popcornmaker_snippet);
    snippetManager.addSnippet(flickr_snippet);
    snippetManager.addSnippet(googlemap_snippet);
    snippetManager.addSnippet(popcorn_snippet);
    snippetManager.addSnippet(url_snippet);
    snippetManager.addSnippet(text_snippet);

    var itemWall = new wall.Wall(wallDiv, snippetManager);

    wallDiv.classList.add('on');

    urlInput.addEventListener('keypress', function(e){
      if(e.which === 13 && urlInput.value.replace(/\s/g, '').length > 0){
        itemWall.add(urlInput.value);
        urlInput.value = '';
      }
    }, false);

    //itemWall.add('http://localhost:8888/v/33_.html', );
    itemWall.add('http://popcorn.webmadecontent.org/aur_');
    itemWall.add('https://thimble.webmaker.org/p/fjtk');
    itemWall.add('http://popcorn.webmadecontent.org/11_');
    itemWall.add('https://thimble.webmaker.org/p/fjt0');
    itemWall.add('https://thimble.webmaker.org/p/fjt6');
    itemWall.add('https://thimble.webmaker.org/p/fjtp');
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start, false);
  }
  else {
    start();
  }

});