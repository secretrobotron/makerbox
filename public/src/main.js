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
    var remixUrl = document.querySelector('.remix-url');

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

    function addRemixListeners(element){
      element.addEventListener('click', function(e){
        element.classList.toggle('remix-mark');
      }, false);
    }

    urlInput.addEventListener('keypress', function(e){
      if(e.which === 13 && urlInput.value.replace(/\s/g, '').length > 0){
        addRemixListeners(itemWall.add(urlInput.value));
        urlInput.value = '';
      }
    }, false);

    Array.prototype.forEach.call(wallDiv.querySelectorAll('.panel'), addRemixListeners);

    setTimeout(function(){
      var urlEnties = document.querySelectorAll('.url-entries input');
      Array.prototype.forEach.call(urlEnties, function(element){
        addRemixListeners(itemWall.add(element.value));
      });
    }, 250);

    document.querySelector('.thimble-remix-button').addEventListener('click', function(e){
      var html = '';
      var panels = wallDiv.querySelectorAll('.panel.remix-mark');

      Array.prototype.forEach.call(panels, function(element){
        html += '<div>' + element.innerHTML + '</div>\n';
      });

      html = html.length > 0 ? html : '<div></div>';

      var form = new FormData();
      form.append('html', html);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://hackpub.hackasaurus.org/publish');

      xhr.onload = function(e){
        var response = JSON.parse(xhr.response);

        var publishedUrl = response['published-url'];
        var thimbleUUID = publishedUrl.substr(publishedUrl.indexOf('poof.hksr.us/') + 13);
        var thimbleUrl = 'http://jsthimble.toolness.org/#/' + thimbleUUID;

        remixUrl.querySelector('a').href = thimbleUrl;
        remixUrl.querySelector('a').innerHTML = thimbleUrl;
      };

      xhr.send(form);
    }, false);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', start, false);
  }
  else {
    start();
  }

});